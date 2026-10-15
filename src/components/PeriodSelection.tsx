import React from 'react';
import { GradeInfo, TermInfo } from '../types';
import { getPeriodsForGrade } from '../data/grades';
import { Award, ChevronLeft, Clock, FileCheck } from 'lucide-react';

interface PeriodSelectionProps {
  grade: GradeInfo;
  term: TermInfo;
  onSelectPeriod: (periodId: string) => void;
}

export const PeriodSelection: React.FC<PeriodSelectionProps> = ({
  grade,
  term,
  onSelectPeriod,
}) => {
  const isHighSchool = grade.stage === 'high' || grade.id >= 10;
  const periods = getPeriodsForGrade(grade);

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-emerald-800 to-[#004D25] text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8 border border-[#D4AF37]/30 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#D4AF37] text-xs font-bold mb-3">
          <span>{grade.name}</span>
          <span>·</span>
          <span>{term.name}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
          {isHighSchool ? 'الاختبارات المقررة' : 'فترات الاختبار المقررة'}
        </h1>
        <p className="text-emerald-100 text-sm max-w-xl">
          {isHighSchool
            ? 'اختر بين الاختبارات الفترية أو الاختبارات النهائية المقررة لبدء استعراض وحل نماذج الاختبارات التفاعلية المباشرة'
            : 'حدد الفترة الدراسية المطلوبة لبدء استعراض وحل نماذج الاختبارات التفاعلية المباشرة'}
        </p>
      </div>

      {/* Instruction */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-stone-800 dark:text-white">
          {isHighSchool
            ? `اختر نوع الاختبار لـ ${grade.shortName} (${term.name})`
            : `اختر فترة الاختبار لـ ${grade.shortName} (${term.name})`}
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-1">
          {isHighSchool
            ? 'حدد الاختبارات الفترية أو الاختبارات النهائية للانتقال مباشرة إلى بنك الأسئلة والحل التفاعلي'
            : 'حدد الفترة المطلوبة للانتقال مباشرة إلى بنك الأسئلة والاختبارات التفاعلية'}
        </p>
      </div>

      {/* The Period Cards (2 cards for High School, 3 cards for Elementary/Middle) */}
      <div
        className={`grid grid-cols-1 ${
          periods.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'
        } gap-6`}
      >
        {periods.map((period) => {
          const isFinal = period.id === 'final';
          const isPeriodic = period.id === 'periodic';

          return (
            <div
              key={period.id}
              onClick={() => onSelectPeriod(period.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectPeriod(period.id);
              }}
              className={`group relative bg-white dark:bg-slate-900 hover:bg-emerald-50/40 dark:hover:bg-slate-800/80 rounded-2xl border-2 ${
                isFinal
                  ? 'border-amber-300 dark:border-amber-700/80 hover:border-amber-500 dark:hover:border-amber-400'
                  : 'border-stone-200 dark:border-slate-800 hover:border-[#006C35] dark:hover:border-emerald-500'
              } p-6 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between`}
            >
              {/* Top Indicator */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`w-10 h-10 rounded-xl font-extrabold text-lg flex items-center justify-center border transition-colors ${
                    isFinal
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800 group-hover:bg-[#D4AF37] group-hover:text-stone-900'
                      : isPeriodic
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-[#006C35] dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 group-hover:bg-[#006C35] group-hover:text-white'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-[#006C35] dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 group-hover:bg-[#006C35] group-hover:text-white'
                  }`}
                >
                  {isFinal ? (
                    <Award className="w-5 h-5 text-amber-700 dark:text-amber-300 group-hover:text-stone-900" />
                  ) : isPeriodic ? (
                    <FileCheck className="w-5 h-5 text-[#006C35] dark:text-emerald-300 group-hover:text-white" />
                  ) : (
                    <span>{period.easternNumber}</span>
                  )}
                </span>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    isFinal
                      ? 'bg-amber-500 text-stone-900'
                      : 'bg-stone-900 dark:bg-slate-800 text-[#D4AF37] border border-stone-800 dark:border-slate-700'
                  }`}
                >
                  {period.name}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white group-hover:text-[#006C35] dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {period.name} لـ {grade.shortName}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-slate-400 leading-relaxed">
                  نماذج {period.name} لـ {grade.shortName} في {term.name} مع تصحيح فوري وشهادة تقدير.
                </p>
              </div>

              {/* Footer action */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-sm">
                <span className="text-xs text-stone-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
                  <span>نماذج اختبارات تفاعلية</span>
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#006C35] dark:text-emerald-400 group-hover:translate-x-[-4px] transition-transform">
                  <span>فتح الاختبارات</span>
                  <ChevronLeft className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
