import React, { useState } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  User, 
  Filter,
  Sparkles
} from 'lucide-react';
import { PreparedQuestion, SkillType } from '../types';
import { SKILL_LABELS } from '../data';

interface ResultScreenProps {
  studentName: string;
  totalScore: number;
  totalQuestions: number;
  skillScores: {
    TU: { dung: number; tong: number };
    QUET: { dung: number; tong: number };
    DOC: { dung: number; tong: number };
  };
  questions: PreparedQuestion[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  studentName,
  totalScore,
  totalQuestions,
  skillScores,
  questions,
  userAnswers,
  onRestart,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');

  const percentage = Math.round((totalScore / totalQuestions) * 100);

  // Motivational message
  const getFeedbackMessage = () => {
    if (percentage >= 90) return { title: 'Xuất sắc! 🎉', text: 'Em làm bài quá tuyệt vời, kiến thức rất vững vàng!' };
    if (percentage >= 75) return { title: 'Làm tốt lắm! 🌟', text: 'Kết quả rất tốt, hãy tiếp tục duy trì phong độ này nhé!' };
    if (percentage >= 50) return { title: 'Khá tốt! 👍', text: 'Em đã nỗ lực nhiều, hãy xem lại các câu sai để nhớ bài hơn nhé!' };
    return { title: 'Cần cố gắng thêm! 💪', text: 'Đừng nản lòng, hãy xem lại bài đọc và từ vựng rồi thử sức lại nhé!' };
  };

  const feedback = getFeedbackMessage();

  const filteredQuestions = questions.filter((q, idx) => {
    const isCorrect = userAnswers[idx] === q.correctAnswerText;
    if (filter === 'correct') return isCorrect;
    if (filter === 'incorrect') return !isCorrect;
    return true;
  });

  return (
    <div className="w-full max-w-3xl mx-auto py-5 sm:py-8 px-4">
      {/* Top Banner Score Card - Vibrant Yellow Palette */}
      <div className="bg-[#FFD93D] border-4 border-[#E6B800] rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_0_#E6B800] mb-8 text-center relative overflow-hidden">
        {/* Background playful circles */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/25 rounded-full blur-sm pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#FF8400]/20 rounded-full blur-sm pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 text-[#5A3E00] text-xs sm:text-sm font-black mb-4 shadow-xs">
            <User className="w-4 h-4 text-[#D35400]" />
            <span>Học sinh: {studentName}</span>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl bg-[#FF8400] text-white flex items-center justify-center shadow-lg shadow-[#FF8400]/30 border-2 border-white/60">
            <Trophy className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#5A3E00] uppercase tracking-tight mb-2">
            Em đúng {totalScore}/{totalQuestions} câu
          </h1>

          <p className="text-[#805800] text-sm sm:text-base font-bold">
            Tỉ lệ hoàn thành: <span className="font-black text-[#D35400] text-lg sm:text-xl">{percentage}%</span>
          </p>

          <div className="mt-4 pt-4 border-t border-[#E6B800]/60 max-w-md mx-auto">
            <p className="text-base sm:text-lg font-black text-[#5A3E00] flex items-center justify-center gap-1.5">
              <Sparkles className="w-5 h-5 text-[#FF8400]" />
              <span>{feedback.title}</span>
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#7A5400] mt-1">{feedback.text}</p>
          </div>
        </div>
      </div>

      {/* 3 Skill Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-4 border-[#4D96FF]/20 mb-8">
        <h2 className="text-base sm:text-lg font-black text-[#2D3436] mb-5 uppercase tracking-wide flex items-center gap-2">
          <span>Kết quả chi tiết theo 3 kỹ năng</span>
        </h2>

        <div className="space-y-4">
          {(['TU', 'QUET', 'DOC'] as SkillType[]).map((code) => {
            const item = skillScores[code];
            const percent = Math.round((item.dung / item.tong) * 100);
            const info = SKILL_LABELS[code];

            const barColor = 
              code === 'TU' ? 'bg-[#6BCB77]' :
              code === 'QUET' ? 'bg-[#4D96FF]' : 'bg-[#FF8400]';

            return (
              <div key={code} className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-black shadow-xs ${info.badgeColor}`}>
                      {code}
                    </span>
                    <span className="font-black text-sm sm:text-base text-[#2D3436]">{info.name}</span>
                  </div>
                  <div className="text-sm font-black text-slate-700">
                    <span className="text-[#0284C7]">{item.dung}</span>/{item.tong} câu ({percent}%)
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#E2E8F0] rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                  <div
                    className={`h-full rounded-full transition-all duration-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] ${barColor}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-4 border-[#FF8400]/20 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-[#2D3436] uppercase tracking-wide">Xem lại đáp án chi tiết</h3>
            <p className="text-xs font-bold text-slate-400">Đối chiếu câu trả lời của em với đáp án chính xác</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#F1F2F6] rounded-2xl self-start sm:self-auto text-xs sm:text-sm font-black">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filter === 'all' ? 'bg-white text-[#2D3436] shadow-md' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Tất cả ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'correct' ? 'bg-[#6BCB77] text-white shadow-md' : 'text-[#4EAF5A] hover:bg-slate-200/60'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đúng ({totalScore})</span>
            </button>
            <button
              type="button"
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'incorrect' ? 'bg-[#FF8400] text-white shadow-md' : 'text-[#D35400] hover:bg-slate-200/60'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Sai ({totalQuestions - totalScore})</span>
            </button>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm font-bold">
              <Filter className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-300" />
              <span>Không có câu hỏi nào trong mục này</span>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const originalIndex = questions.indexOf(q);
              const userAnswer = userAnswers[originalIndex];
              const isCorrect = userAnswer === q.correctAnswerText;
              const skillInfo = SKILL_LABELS[q.kyNang];

              return (
                <div
                  key={`review-${q.id}`}
                  className={`p-4 sm:p-5 rounded-2xl border-3 transition-all ${
                    isCorrect
                      ? 'border-[#6BCB77]/30 bg-[#6BCB77]/10'
                      : 'border-[#FF8400]/30 bg-[#FF8400]/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-[#6BCB77]" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[#FF8400]" />
                        )}
                      </div>
                      <span className="font-black text-sm sm:text-base text-[#2D3436]">
                        Câu {originalIndex + 1}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-black shadow-xs ${skillInfo.badgeColor}`}>
                      {q.kyNang}
                    </span>
                  </div>

                  <p className="text-[#2D3436] text-sm sm:text-base font-bold mb-3 ml-7 leading-snug">
                    {q.hoi}
                  </p>

                  <div className="ml-7 space-y-1.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-slate-500 shrink-0">Đáp án của em:</span>
                      <span className={`font-black ${isCorrect ? 'text-[#2e7d32]' : 'text-[#c0392b]'}`}>
                        {userAnswer || '(Chưa chọn)'}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-slate-500 shrink-0">Đáp án đúng:</span>
                        <span className="font-black text-[#2e7d32]">
                          {q.correctAnswerText}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center pb-8">
        <button
          id="btn-restart-quiz"
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2.5 py-4 px-10 rounded-2xl bg-[#6BCB77] hover:bg-[#5bb867] text-white font-black text-base sm:text-lg border-b-4 border-[#4EAF5A] shadow-xl hover:scale-105 active:translate-y-1 active:border-b-0 transition-all cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>LÀM LẠI TỪ ĐẦU</span>
        </button>
      </div>
    </div>
  );
};
