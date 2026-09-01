import { useState, useCallback, useEffect, useRef } from 'react';
import { NameSelectScreen } from './components/NameSelectScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { RAW_QUESTIONS, WEBHOOK_URL } from './data';
import { PreparedQuestion, RawQuestion, SubmissionPayload } from './types';

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Prepare 30 questions with partitioned shuffling & option shuffling
function prepareQuizQuestions(): PreparedQuestion[] {
  const part1Raw = RAW_QUESTIONS.filter((q) => q.kyNang === 'TU');
  const part2Raw = RAW_QUESTIONS.filter((q) => q.kyNang === 'QUET');
  const part3Raw = RAW_QUESTIONS.filter((q) => q.kyNang === 'DOC');

  const shuffledPart1 = shuffleArray(part1Raw);
  const shuffledPart2 = shuffleArray(part2Raw);
  const shuffledPart3 = shuffleArray(part3Raw);

  const allOrderedRaw: RawQuestion[] = [
    ...shuffledPart1,
    ...shuffledPart2,
    ...shuffledPart3,
  ];

  return allOrderedRaw.map((rawQ, index) => {
    const correctText = rawQ[rawQ.dapAn];
    const originalOptions = [rawQ.A, rawQ.B, rawQ.C, rawQ.D];
    const shuffledOptions = shuffleArray(originalOptions);

    return {
      id: index + 1,
      originalCau: rawQ.cau,
      kyNang: rawQ.kyNang,
      hoi: rawQ.hoi,
      options: shuffledOptions,
      correctAnswerText: correctText,
    };
  });
}

type ScreenMode = 'name_select' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<ScreenMode>('name_select');
  const [studentName, setStudentName] = useState<string>('');
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  
  // Track webhook submission to avoid duplicate calls in strict mode
  const submittedRef = useRef(false);

  // Start Quiz: initialize questions with clean order and clear answers
  const handleStartQuiz = () => {
    if (!studentName) return;
    const prepared = prepareQuizQuestions();
    setQuestions(prepared);
    setCurrentIndex(0);
    setUserAnswers({});
    submittedRef.current = false;
    setScreen('quiz');
  };

  // Option selection for current question
  const handleSelectOption = (optionText: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionText,
    }));
  };

  // Move to next question or submit
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished quiz -> Go to Result screen
      setScreen('result');
    }
  };

  // Calculate scores
  let totalScore = 0;
  const skillScores = {
    TU: { dung: 0, tong: 10 },
    QUET: { dung: 0, tong: 10 },
    DOC: { dung: 0, tong: 10 },
  };

  questions.forEach((q, idx) => {
    const answer = userAnswers[idx];
    const isCorrect = answer === q.correctAnswerText;
    if (isCorrect) {
      totalScore += 1;
      if (q.kyNang in skillScores) {
        skillScores[q.kyNang].dung += 1;
      }
    }
  });

  // Webhook submission upon reaching result screen
  const sendResultsToWebhook = useCallback(() => {
    if (submittedRef.current || !studentName) return;
    submittedRef.current = true;

    const payload: SubmissionPayload = {
      ten: studentName,
      lop: '7',
      diem: totalScore,
      tongCau: 30,
      url: window.location.href,
      chiTiet: {
        TU: { dung: skillScores.TU.dung, tong: 10 },
        QUET: { dung: skillScores.QUET.dung, tong: 10 },
        DOC: { dung: skillScores.DOC.dung, tong: 10 },
      },
    };

    console.log('Sending quiz results to Google Apps Script webhook:', payload);

    // Send POST request without blocking UI
    try {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      })
        .then(() => {
          console.log('Kết quả đã được gửi thành công tới webhook!');
        })
        .catch((err) => {
          console.error('Lỗi khi gửi kết quả tới webhook:', err);
        });
    } catch (err) {
      console.error('Lỗi gửi webhook:', err);
    }
  }, [studentName, totalScore, skillScores]);

  useEffect(() => {
    if (screen === 'result') {
      sendResultsToWebhook();
    }
  }, [screen, sendResultsToWebhook]);

  // Restart Quiz
  const handleRestart = () => {
    setScreen('name_select');
    setStudentName('');
    setQuestions([]);
    setCurrentIndex(0);
    setUserAnswers({});
    submittedRef.current = false;
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col justify-between selection:bg-[#FFD93D] selection:text-[#5A3E00]">
      {/* Header - Vibrant Sunshine Yellow Bar */}
      <header className="bg-[#FFD93D] border-b-4 border-[#E6B800] sticky top-0 z-30 shadow-[0_4px_0_0_#E6B800] rounded-b-[24px] sm:rounded-b-[28px]">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF8400] text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white/70 shrink-0">
              7
            </div>
            <div>
              <h1 className="font-black text-[#5A3E00] text-sm sm:text-base uppercase tracking-tight leading-tight">
                Tiếng Anh Lớp 7
              </h1>
              <p className="text-[11px] sm:text-xs text-[#805800] font-bold">
                Flyers ➔ KET • 30 câu trắc nghiệm
              </p>
            </div>
          </div>

          {studentName && screen !== 'name_select' && (
            <div className="px-3.5 py-1 rounded-full bg-white/80 border-2 border-white text-xs sm:text-sm font-black text-[#D35400] shadow-xs flex items-center gap-1.5">
              <span>👤 {studentName}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {screen === 'name_select' && (
          <NameSelectScreen
            selectedName={studentName}
            onSelectName={setStudentName}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {screen === 'quiz' && questions.length > 0 && (
          <QuizScreen
            studentName={studentName}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            currentQuestion={questions[currentIndex]}
            selectedAnswer={userAnswers[currentIndex]}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            studentName={studentName}
            totalScore={totalScore}
            totalQuestions={questions.length || 30}
            skillScores={skillScores}
            questions={questions}
            userAnswers={userAnswers}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t-2 border-slate-200/60 bg-white/60 py-3 text-center text-xs font-bold text-slate-400">
        <p>Hệ thống bài tập Tiếng Anh Lớp 7 • Tự động chấm điểm & báo cáo</p>
      </footer>
    </div>
  );
}
