import React, { useState } from 'react';
import { Sparkles, Search, Award, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { toEasternNumerals } from '../utils/numerals';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onExploreGrades: () => void;
  onNavigate?: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onExploreGrades,
  onNavigate,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput.trim());
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 mb-10 text-center">
      {/* Background Decorative Pattern & Gradient */}
      <div className="absolute inset-0 bg-radial from-emerald-100/50 dark:from-emerald-950/40 via-stone-50 dark:via-slate-950 to-stone-50 dark:to-slate-950 -z-10" />

      {/* Floating Accent Badges */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-[#006C35] dark:text-emerald-300 text-xs font-extrabold mb-4 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
        <span>إختبارات المدرسة السعودية · منصة الاختبارات المباشرة</span>
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
        تعلَّم، تدرَّب، وتفوَّق في <br className="hidden sm:inline" />
        <span className="text-[#006C35] dark:text-emerald-400 relative inline-block">
          إختبارات المدرسة السعودية
          <span className="absolute bottom-1 right-0 left-0 h-2 bg-[#D4AF37]/30 -z-10 rounded-sm"></span>
        </span>
      </h1>

      <p className="mt-4 text-stone-600 dark:text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
        بنك اختبارات تفاعلية متكامل لجميع صفوف التعليم العام بالمملكة (١ - ١٢). حل الأسئلة سؤالاً يتلوه سؤال، واكتشف نتيجتك فوراً مع شروحات تعليمية وشهادات تفوق بالإسم قابلة للطباعة.
      </p>

      {/* Quick Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="mt-6 max-w-xl mx-auto flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-stone-200 dark:border-slate-800 focus-within:border-[#006C35] dark:focus-within:border-emerald-500 shadow-md p-1.5 transition-all"
      >
        <div className="p-2 text-stone-400 dark:text-slate-400">
          <Search className="w-5 h-5 text-[#006C35] dark:text-emerald-400" />
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="ابحث عن مادة أو اختبار (مثال: لغتي الجميلة، الرياضيات، العلوم)..."
          className="flex-1 px-2 py-2 text-xs sm:text-sm text-stone-800 dark:text-slate-100 font-medium focus:outline-none bg-transparent placeholder-stone-400 dark:placeholder-slate-500"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#006C35] hover:bg-[#004D25] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
        >
          بحث
        </button>
      </form>

      {/* Quick Direct Link to First Grade Period 1 Tests */}
      <div className="mt-5 flex justify-center">
        <a
          href="/grade/1/term/1/period/first_period"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate('/grade/1/term/1/period/first_period');
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#006C35]/10 hover:bg-[#006C35]/20 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-[#006C35]/30 text-[#006C35] dark:text-emerald-300 text-xs sm:text-sm font-extrabold transition-all group"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span>🎯 متاح الآن: اختبارات الفترة الأولى - الصف الأول ابتدائي (الفصل الأول)</span>
          <span className="underline decoration-[#D4AF37] decoration-2 underline-offset-4">ابدأ الحل مباشرة ←</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-bold text-stone-600 dark:text-slate-300">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
          <span>١٢ صَفّاً دراسياً شاملاً</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
          <span>مطابق لتقويم الفصلين الدراسيين والفترات</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
          <span>شهادات تفوق قابلة للطباعة مجاناً</span>
        </div>
      </div>
    </section>
  );
};
