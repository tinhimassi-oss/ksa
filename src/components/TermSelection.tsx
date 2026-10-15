import React from 'react';
import { GradeInfo } from '../types';
import { TERMS_DATA } from '../data/grades';
import { ChevronLeft, Clock } from 'lucide-react';

interface TermSelectionProps {
  grade: GradeInfo;
  onSelectTerm: (termId: number) => void;
}

export const TermSelection: React.FC<TermSelectionProps> = ({
  grade,
  onSelectTerm,
}) => {
  const isHighSchool = grade.stage === 'high' || grade.id >= 10;

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Grade Header Banner */}
      <div className="bg-gradient-to-l from-[#006C35] to-[#004D25] text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8 relative overflow-hidden border border-[#D4AF37]/40">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none text-9xl font-extrabold text-white">
          {grade.easternNumber}
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#D4AF37] text-xs font-bold mb-3 border border-white/20">
            <span>{grade.stageName}</span>
            <span>·</span>
            <span>الصف {grade.easternNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            {grade.name}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl">
            {isHighSchool
              ? 'اختر الفصل الدراسي المطلوب لاستعراض الاختبارات الفترية والاختبارات النهائية المقررة'
              : 'اختر الفصل الدراسي المطلوب لاستعراض اختبارات الفترات والاختبارات النهائية المقررة'}
          </p>
        </div>
      </div>

      {/* Instruction */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-stone-800 dark:text-white">
          اختر الفصل الدراسي لـ {grade.shortName}
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-1">
          {isHighSchool
            ? 'قم بتحديد الفصل للانتقال إلى الاختبارات الفترية أو الاختبارات النهائية'
            : 'قم بتحديد الفصل للانتقال إلى اختبارات الفترة الأولى، الفترة الثانية، أو الاختبارات النهائية'}
        </p>
      </div>

      {/* The Term Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TERMS_DATA.map((term) => (
          <div
            key={term.id}
            onClick={() => onSelectTerm(term.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectTerm(term.id);
            }}
            className="group relative bg-white dark:bg-slate-900 hover:bg-emerald-50/40 dark:hover:bg-slate-800/80 rounded-2xl border-2 border-stone-200 dark:border-slate-800 hover:border-[#006C35] dark:hover:border-emerald-500 p-6 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#006C35] dark:text-emerald-300 font-extrabold text-lg flex items-center justify-center border border-emerald-200 dark:border-emerald-800 group-hover:bg-[#006C35] group-hover:text-white transition-colors">
                {term.easternNumber}
              </span>
              <span className="text-xs font-bold text-[#D4AF37] bg-stone-900 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-stone-800 dark:border-slate-700">
                {term.name}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white group-hover:text-[#006C35] dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {term.name} لـ {grade.shortName}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-slate-400 leading-relaxed">
                {isHighSchool
                  ? 'يشمل الاختبارات الفترية والاختبارات النهائية الشاملة المقررة.'
                  : 'يشمل اختبارات الفترة الأولى، اختبارات الفترة الثانية، والاختبارات النهائية الشاملة المقررة.'}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-sm">
              <span className="text-xs text-stone-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
                <span>{isHighSchool ? 'الاختبارات الفترية والنهائية' : 'الفترات والاختبارات النهائية'}</span>
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-[#006C35] dark:text-emerald-400 group-hover:translate-x-[-4px] transition-transform">
                <span>{isHighSchool ? 'استعراض الاختبارات' : 'استعراض الفترات'}</span>
                <ChevronLeft className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
