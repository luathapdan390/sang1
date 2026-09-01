import React from 'react';
import { BookOpen, Newspaper } from 'lucide-react';
import { PASSAGE_QUET, PASSAGE_DOC } from '../data';
import { SkillType } from '../types';

interface ReadingPassageProps {
  kyNang: SkillType;
}

export const ReadingPassage: React.FC<ReadingPassageProps> = ({ kyNang }) => {
  if (kyNang === 'TU') {
    return null;
  }

  const isQuet = kyNang === 'QUET';
  const title = isQuet ? 'BÀI ĐỌC PHẦN 2 (Quét thông tin)' : 'BÀI ĐỌC PHẦN 3 (Đọc hiểu)';
  const skillCode = isQuet ? 'QUET' : 'DOC';
  const content = isQuet ? PASSAGE_QUET : PASSAGE_DOC;
  const accentBorderColor = isQuet ? 'border-[#4D96FF]/25' : 'border-[#FF8400]/25';
  const badgeColor = isQuet ? 'bg-[#4D96FF]' : 'bg-[#FF8400]';
  const iconColor = isQuet ? 'text-[#4D96FF]' : 'text-[#FF8400]';

  return (
    <div className={`mb-6 overflow-hidden rounded-3xl bg-white p-4 sm:p-5 border-4 ${accentBorderColor} shadow-md transition-all`}>
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-slate-100">
            {isQuet ? (
              <Newspaper className={`h-5 w-5 ${iconColor}`} />
            ) : (
              <BookOpen className={`h-5 w-5 ${iconColor}`} />
            )}
          </div>
          <div>
            <span className={`${badgeColor} text-white text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wide mr-2 shadow-xs`}>
              {title}
            </span>
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              Kỹ năng: {skillCode}
            </span>
          </div>
        </div>

        <span className="text-[11px] font-bold text-slate-400 italic">
          💡 Cuộn để xem lại
        </span>
      </div>

      <div className="bg-[#F8FAFC] p-4 sm:p-5 rounded-2xl border-2 border-dashed border-[#CBD5E1] max-h-64 overflow-y-auto text-sm sm:text-base leading-relaxed text-[#334155] select-text">
        <div className="whitespace-pre-line font-medium leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};
