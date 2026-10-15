import React from 'react';
import { SeoArticle, TestItem } from '../types';
import { getGradeById } from '../data/grades';
import {
  BookOpen,
  Sparkles,
  Tag,
  CheckCircle,
  Lightbulb,
  GraduationCap,
  FileText,
} from 'lucide-react';

interface ArticleSectionProps {
  test: TestItem;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({ test }) => {
  const article: SeoArticle | undefined = test.seoArticle;

  if (!article) return null;

  const gradeInfo = test.gradeId ? getGradeById(test.gradeId) : undefined;
  const gradeLabel = gradeInfo ? gradeInfo.shortName : (test.gradeId ? `الصف ${test.gradeId} ابتدائي` : 'المرحلة الابتدائية');
  const termLabel = test.term === 1 ? 'الفصل الدراسي الأول' : test.term === 2 ? 'الفصل الدراسي الثاني' : test.term === 3 ? 'الفصل الدراسي الثالث' : '';
  const periodLabel = test.period === 'first_period' ? 'اختبارات الفترة الأولى' : test.period === 'second_period' ? 'اختبارات الفترة الثانية' : 'اختبارات نهاية الفصل';

  const importanceTitle = article.importanceH2 || 'أهمية المراجعة والتحدي للطلاب';
  const importanceBody = article.importanceContent || article.importanceSection || '';
  const keyTopicsTitle = article.keyTopicsH2 || 'أبرز المحاور والمهارات التي يغطيها الاختبار';
  
  const topicsList =
    article.keyTopics?.map((t) => ({ title: t.h3, desc: t.content })) ||
    article.topicsCovered?.map((t) => ({ title: t.title, desc: t.description })) ||
    [];

  const tipsTitle = article.tipsH2 || 'نصائح وإرشادات ذهبية لحل الاختبار بتفوق';
  const tipsList = article.tips || article.examTips || [];
  const keywordsList = article.targetKeywords || article.keywords || [];

  return (
    <article
      id="seo-article"
      aria-label={article.h1}
      className="mt-10 sm:mt-14 pt-8 border-t-2 border-dashed border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-stone-200/80 dark:border-slate-800 shadow-sm transition-colors">
        {/* Top Badges & Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#006C35]/10 text-[#006C35] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#006C35]/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{gradeLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>{periodLabel}{termLabel ? ` - ${termLabel}` : ''}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300">
            <FileText className="w-3 h-3" />
            <span>مقال تعليمي وتوجيهي حصري (SEO)</span>
          </span>
        </div>

        {/* H1 Article Title (matches Google Sheets file title) */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 dark:white leading-tight sm:leading-snug mb-4">
          {article.h1}
        </h1>

        {/* Meta Description Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#006C35] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#006C35] dark:text-emerald-400 mb-1">
                ملخص ودليل المراجعة الشامل للاختبار
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-medium">
                {article.metaDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="text-stone-700 dark:text-slate-300 leading-relaxed sm:text-base text-sm text-justify font-normal">
            {article.introduction}
          </p>
        </section>

        {/* Importance Section (H2) */}
        {importanceBody && (
          <section className="mb-8 p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-slate-850/60 border border-stone-200/70 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white flex items-center gap-2 mb-3">
              <span className="w-2.5 h-6 rounded-full bg-[#006C35]"></span>
              <span>{importanceTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed text-justify">
              {importanceBody}
            </p>
          </section>
        )}

        {/* Key Topics Section (H2 & H3s) */}
        {topicsList.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="w-2.5 h-6 rounded-full bg-[#D4AF37]"></span>
              <span>{keyTopicsTitle}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicsList.map((topic, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-800/40 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#006C35] dark:text-emerald-400 shrink-0" />
                    <span>{topic.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed text-justify">
                    {topic.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Golden Tips Section (H2) */}
        {tipsList.length > 0 && (
          <section className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
            <h2 className="text-lg sm:text-xl font-black text-amber-900 dark:text-amber-200 flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>{tipsTitle}</span>
            </h2>
            <ul className="space-y-3">
              {tipsList.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed"
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Conclusion */}
        {article.conclusion && (
          <section className="mb-8 p-5 rounded-2xl bg-[#006C35]/5 dark:bg-emerald-950/30 border border-[#006C35]/20 dark:border-emerald-900/40">
            <h3 className="text-sm font-extrabold text-[#006C35] dark:text-emerald-400 mb-2">
              خاتمة وتطلعات التفوق الدراسي
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-medium text-justify">
              {article.conclusion}
            </p>
          </section>
        )}

        {/* Target Keywords (SEO Tags) */}
        {keywordsList.length > 0 && (
          <div className="pt-6 border-t border-stone-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-stone-500 dark:text-slate-400">
              <Tag className="w-3.5 h-3.5" />
              <span>الكلمات المفتاحية المستهدفة في محركات البحث (Google SEO):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywordsList.map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 border border-stone-200/60 dark:border-slate-700"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
