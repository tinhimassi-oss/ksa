import React from 'react';
import { GradeInfo } from '../types';
import { toEasternNumerals } from '../utils/numerals';
import {
  BookOpen,
  Pencil,
  Sparkles,
  Compass,
  Calculator,
  GraduationCap,
  Atom,
  Layers,
  Award,
  Cpu,
  Binary,
  Trophy,
  ArrowLeft,
  FileCheck2,
} from 'lucide-react';

interface GradeGridProps {
  grades: GradeInfo[];
  countsByGrade: Record<number, number>;
  onSelectGrade: (gradeId: number) => void;
}

// Icon mapping
const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  BookOpen,
  Pencil,
  Sparkles,
  Compass,
  Calculator,
  GraduationCap,
  Atom,
  Layers,
  Award,
  Cpu,
  Binary,
  Trophy,
};

export const GradeGrid: React.FC<GradeGridProps> = ({
  grades,
  countsByGrade,
  onSelectGrade,
}) => {
  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#006C35] dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>اختر صفك الدراسي لبدء حل الاختبارات المباشرة</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-white leading-tight">
          جميع المراحل والصفوف الدراسية بالمملكة
        </h2>
        <p className="mt-2 text-stone-600 dark:text-slate-300 text-sm sm:text-base">
          ١٢ صفاً دراسياً من الصف الأول الابتدائي حتى الثالث الثانوي للاختبارات الفترية والنهائية
        </p>
      </div>

      {/* 
        The 12-Card Grid:
        12 cells arranged in 4 rows, each row has 3 cells (lg:grid-cols-3)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {grades.map((grade) => {
          const IconComponent = ICONS_MAP[grade.iconName] || BookOpen;
          const testCount = countsByGrade[grade.id] || 0;

          // Theme styling depending on stage
          let themeBorder = 'border-emerald-200 dark:border-slate-800 hover:border-[#006C35] dark:hover:border-emerald-500';
          let themeHeaderBg = 'bg-linear-to-r from-emerald-700 to-[#006C35]';

          if (grade.stage === 'middle') {
            themeBorder = 'border-teal-200 dark:border-slate-800 hover:border-teal-700 dark:hover:border-teal-500';
            themeHeaderBg = 'bg-linear-to-r from-teal-800 to-teal-700';
          } else if (grade.stage === 'high') {
            themeBorder = 'border-amber-200 dark:border-slate-800 hover:border-[#B88E18] dark:hover:border-amber-500';
            themeHeaderBg = 'bg-linear-to-r from-stone-800 to-emerald-900';
          }

          return (
            <div
              key={grade.id}
              onClick={() => onSelectGrade(grade.id)}
              className={`group relative bg-white dark:bg-slate-900 rounded-2xl border-2 ${themeBorder} shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectGrade(grade.id);
                }
              }}
            >
              {/* Card Upper Banner with Pattern */}
              <div className={`p-5 text-white ${themeHeaderBg} relative overflow-hidden`}>
                {/* Decorative Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 10px 10px, #ffffff 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                <div className="flex items-center justify-between relative z-10">
                  {/* Eastern Arabic Stage Index Badge */}
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-extrabold text-xl text-[#D4AF37] border border-white/30 shadow-xs">
                      {grade.easternNumber}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/20">
                      {grade.stageName}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform text-[#D4AF37]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#006C35] dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {grade.name}
                  </h3>

                  <p className="mt-2 text-xs text-stone-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {grade.description}
                  </p>
                </div>

                {/* Footer specs & CTA */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-slate-400 font-medium">
                    <FileCheck2 className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
                    <span>
                      {testCount > 0
                        ? `${toEasternNumerals(testCount)} اختبارات متاحة`
                        : 'عرض الأقسام'}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006C35] dark:text-emerald-400 group-hover:translate-x-[-3px] transition-transform">
                    <span>دخول</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Bottom Subtle Gold Accent Bar */}
              <div className="h-1 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
