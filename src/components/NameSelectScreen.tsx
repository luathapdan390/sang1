import React from 'react';
import { Sparkles, User, ArrowRight, Award, BookCheck, CheckCircle2 } from 'lucide-react';
import { STUDENT_NAMES } from '../data';

interface NameSelectScreenProps {
  selectedName: string;
  onSelectName: (name: string) => void;
  onStartQuiz: () => void;
}

export const NameSelectScreen: React.FC<NameSelectScreenProps> = ({
  selectedName,
  onSelectName,
  onStartQuiz,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto py-4 sm:py-8 px-4">
      {/* Header Banner */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD93D] border-2 border-[#E6B800] text-[#5A3E00] text-xs sm:text-sm font-black mb-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D35400]" />
          <span>LỚP 7 • FLYERS ➔ KET</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#2D3436] uppercase tracking-tight leading-tight">
          Luyện Tập Tiếng Anh Lớp 7
        </h1>
        <p className="text-[#636E72] text-sm sm:text-base font-medium mt-2 max-w-md mx-auto">
          Bộ đề chuẩn 30 câu trắc nghiệm rèn luyện toàn diện 3 kỹ năng Từ vựng, Quét thông tin và Đọc hiểu.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-[#4D96FF]/20">
        <div className="mb-6">
          <label 
            htmlFor="student-select" 
            className="block text-sm sm:text-base font-black text-[#2D3436] mb-2.5 flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-[#FF8400]/15 flex items-center justify-center text-[#FF8400]">
              <User className="w-4 h-4" />
            </div>
            <span>Chọn tên của em</span>
            <span className="text-[#FF8400]">*</span>
          </label>
          
          <div className="relative">
            <select
              id="student-select"
              value={selectedName}
              onChange={(e) => onSelectName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#CBD5E1] bg-[#F8FAFC] text-[#2D3436] text-base font-bold focus:border-[#4D96FF] focus:bg-white focus:outline-none transition-all cursor-pointer shadow-xs"
            >
              <option value="" disabled>-- Chọn tên của em --</option>
              {STUDENT_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-2">
            Vui lòng chọn đúng tên để hệ thống ghi nhận kết quả làm bài của em.
          </p>
        </div>

        {/* Structure Overview */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 sm:p-5 border-2 border-dashed border-[#CBD5E1] mb-6 space-y-2.5 text-xs sm:text-sm">
          <div className="font-black text-[#2D3436] flex items-center gap-1.5 pb-2 border-b border-slate-200 uppercase tracking-wide">
            <BookCheck className="w-4 h-4 text-[#4D96FF]" />
            <span>Cấu trúc bài luyện tập (30 câu):</span>
          </div>
          <div className="grid grid-cols-1 gap-2 pt-1 font-bold">
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
              <span className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#6BCB77]" />
                <span>Phần 1: Từ vựng (TU)</span>
              </span>
              <span className="bg-[#6BCB77]/15 text-[#2E7BE6] px-2.5 py-0.5 rounded-lg text-xs font-black">10 câu</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
              <span className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#4D96FF]" />
                <span>Phần 2: Quét thông tin (QUET)</span>
              </span>
              <span className="bg-[#4D96FF]/15 text-[#4D96FF] px-2.5 py-0.5 rounded-lg text-xs font-black">10 câu + Bài đọc</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100">
              <span className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#FF8400]" />
                <span>Phần 3: Đọc hiểu (DOC)</span>
              </span>
              <span className="bg-[#FF8400]/15 text-[#FF8400] px-2.5 py-0.5 rounded-lg text-xs font-black">10 câu + Bài đọc</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          id="btn-start-quiz"
          type="button"
          onClick={onStartQuiz}
          disabled={!selectedName}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all ${
            selectedName
              ? 'bg-[#6BCB77] hover:bg-[#5bb867] text-white border-b-4 border-[#4EAF5A] shadow-lg hover:scale-[1.01] active:translate-y-1 active:border-b-0 cursor-pointer'
              : 'bg-[#DFE4EA] text-[#A4B0BE] border-b-4 border-[#CED6E0] cursor-not-allowed shadow-none'
          }`}
        >
          <span>BẮT ĐẦU LÀM BÀI</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-1.5">
        <Award className="w-4 h-4 text-[#FF8400]" />
        <span>Chúc em làm bài thật tốt và đạt kết quả cao nhất!</span>
      </div>
    </div>
  );
};
