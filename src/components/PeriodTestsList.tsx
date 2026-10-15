import React, { useState } from 'react';
import { GradeInfo, TermInfo, PeriodInfo, TestItem } from '../types';
import { toEasternNumerals } from '../utils/numerals';
import {
  BookOpen,
  Clock,
  Award,
  Play,
  HelpCircle,
  Filter,
  User,
  School,
  Sparkles,
  FileText,
} from 'lucide-react';

interface PeriodTestsListProps {
  grade: GradeInfo;
  term: TermInfo;
  period: PeriodInfo;
  tests: TestItem[];
  onStartQuiz: (testId: string) => void;
}

export const PeriodTestsList: React.FC<PeriodTestsListProps> = ({
  grade,
  term,
  period,
  tests,
  onStartQuiz,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Extract unique subjects
  const subjects = Array.from(new Set(tests.map((t) => t.subject)));

  const filteredTests =
    selectedSubject === 'all'
      ? tests
      : tests.filter((t) => t.subject === selectedSubject);

  return (
    <div className="max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs mb-8 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-white bg-[#006C35] px-2.5 py-0.5 rounded-full">
              {grade.name}
            </span>
            <span className="text-xs font-bold text-stone-700 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
              {term.name}
            </span>
            <span className="text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
              {period.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            {period.name} - لـ {grade.shortName}، {term.name}
          </h1>
          <p className="mt-1 text-sm text-stone-600 dark:text-slate-300">
            اختر الاختبار وابدأ حله مباشرة بنظام الأسئلة التفاعلية الفورية مع رصد الدرجات وإصدار الشهادات.
          </p>
        </div>

        {/* Filter by subject */}
        {subjects.length > 0 && (
          <div className="mt-6 pt-5 border-t border-stone-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-stone-500 dark:text-slate-400 flex items-center gap-1 ml-2">
              <Filter className="w-3.5 h-3.5" />
              <span>تصفية حسب المادة:</span>
            </span>
            <button
              onClick={() => setSelectedSubject('all')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-stone-900 dark:bg-emerald-700 text-white'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
              }`}
            >
              الكل ({toEasternNumerals(tests.length)})
            </button>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-[#006C35] text-white'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                }`}
              >
                {sub} (
                {toEasternNumerals(tests.filter((t) => t.subject === sub).length)}
                )
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tests Grid */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-stone-200 dark:border-slate-800 p-8">
          <BookOpen className="w-12 h-12 text-stone-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-700 dark:text-slate-200">لا توجد اختبارات متاحة حالياً في هذا القسم</h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            سيتم إضافة نماذج اختبارات تفاعلية جديدة لهذا القسم في القريب العاجل.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-[#006C35] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800">
                      مادة: {test.subject}
                    </span>
                    {test.seoArticle && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span>لغز تفاعلي ومقال</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{toEasternNumerals(test.durationMinutes)} دقيقة</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-[#006C35] dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {test.testTitle}
                </h3>

                {test.seoArticle && (
                  <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {test.seoArticle.metaDescription}
                  </p>
                )}

                {/* Author details */}
                <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-stone-500 dark:text-slate-400">
                  {test.authorName && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#006C35] dark:text-emerald-400" />
                      <span>{test.authorName}</span>
                    </span>
                  )}
                  {test.schoolName && (
                    <span className="flex items-center gap-1">
                      <School className="w-3 h-3 text-stone-400 dark:text-slate-500" />
                      <span>{test.schoolName}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom stats and action */}
              <div className="mt-5 pt-4 border-t border-stone-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-slate-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
                    <span>{toEasternNumerals(test.questions.length)} أسئلة</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#006C35] dark:text-emerald-400">
                    <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{toEasternNumerals(test.totalMarks)} درجات</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStartQuiz(test.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006C35] hover:bg-[#004D25] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                    <span>ابدء الإختبار</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
