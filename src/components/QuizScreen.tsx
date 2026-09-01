import React from 'react';
import { ArrowRight, User, Send } from 'lucide-react';
import { PreparedQuestion } from '../types';
import { SKILL_LABELS } from '../data';
import { ReadingPassage } from './ReadingPassage';

interface QuizScreenProps {
  studentName: string;
  currentIndex: number;
  totalQuestions: number;
  currentQuestion: PreparedQuestion;
  selectedAnswer?: string;
  onSelectOption: (optionText: string) => void;
  onNextQuestion: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  studentName,
  currentIndex,
  totalQuestions,
  currentQuestion,
  selectedAnswer,
  onSelectOption,
  onNextQuestion,
}) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const skillInfo = SKILL_LABELS[currentQuestion.kyNang];

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-3xl mx-auto py-3 sm:py-5 px-3 sm:px-4">
      {/* Top Bar with Name & Progress Card */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border-2 border-slate-100 mb-4 sm:mb-5">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FF8400]/15 flex items-center justify-center text-[#D35400] font-black text-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Học sinh</p>
              <p className="text-sm sm:text-base font-black text-[#2D3436]">{studentName}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] border border-[#4D96FF]/30 text-[#0284C7] text-xs sm:text-sm font-black">
              <span>Câu {currentIndex + 1} / {totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar with vibrant green indicator */}
        <div className="w-full bg-[#E2E8F0] rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
          <div
            className="bg-[#6BCB77] h-full rounded-full transition-all duration-300 ease-out shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Reading Passage if QUET or DOC */}
      <ReadingPassage kyNang={currentQuestion.kyNang} />

      {/* Question Card */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-[#FF8400]/25 shadow-xl flex flex-col gap-4 mb-6">
        {/* Question Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="bg-[#FF8400] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shadow-md shrink-0">
              {currentIndex + 1}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-500">
              Câu hỏi số {currentIndex + 1}
            </span>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-black border shadow-xs ${skillInfo.badgeColor}`}>
            {skillInfo.name}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl font-black text-[#2D3436] leading-snug">
          {currentQuestion.hoi}
        </h2>

        {/* 4 Options Grid (responsive 1 col on small mobile, 2 cols on sm+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const letter = optionLetters[idx] || `${idx + 1}`;

            return (
              <button
                key={`${currentQuestion.id}-opt-${idx}`}
                id={`option-btn-${idx}`}
                type="button"
                onClick={() => onSelectOption(option)}
                className={`group flex items-center p-4 rounded-2xl transition-all select-none cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#4D96FF] text-white border-b-4 border-[#2E7BE6] shadow-lg translate-y-0.5'
                    : 'bg-[#F1F2F6] hover:bg-[#E2E8F0] text-[#2D3436] border-b-4 border-[#DFE4EA] hover:border-[#CBD5E1] active:translate-y-1 active:border-b-0'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black mr-3.5 shadow-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#2E7BE6] text-white'
                      : 'bg-white text-[#4D96FF] group-hover:bg-[#4D96FF] group-hover:text-white'
                  }`}
                >
                  {letter}
                </div>
                <span className={`text-base sm:text-lg font-bold flex-1 leading-snug ${isSelected ? 'text-white' : 'text-[#2D3436]'}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Action Navigation Footer */}
      <div className="flex items-center justify-between px-2 pb-3">
        <p className="text-xs font-bold text-slate-400">
          Tiến trình: {currentIndex + 1} / {totalQuestions} câu hỏi
        </p>

        <button
          id="btn-next-question"
          type="button"
          onClick={onNextQuestion}
          disabled={!selectedAnswer}
          className={`font-black px-8 sm:px-10 py-3.5 rounded-2xl border-b-4 flex items-center gap-2 transition-all ${
            selectedAnswer
              ? isLastQuestion
                ? 'bg-[#FF8400] hover:bg-[#e67700] text-white border-[#D35400] shadow-lg hover:scale-105 active:translate-y-1 active:border-b-0 cursor-pointer'
                : 'bg-[#6BCB77] hover:bg-[#5bb867] text-white border-[#4EAF5A] shadow-lg hover:scale-105 active:translate-y-1 active:border-b-0 cursor-pointer'
              : 'bg-[#DFE4EA] text-[#A4B0BE] border-[#CED6E0] cursor-not-allowed shadow-none'
          }`}
        >
          <span>{isLastQuestion ? 'NỘP BÀI' : 'CÂU TIẾP THEO'}</span>
          {isLastQuestion ? (
            <Send className="w-5 h-5" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
