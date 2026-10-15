import React from 'react';
import { ArrowRight, ChevronLeft, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  onBack: () => void;
  backText?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  onBack,
  backText = 'رجوع للخلف',
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 bg-white/80 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl border border-stone-200/80 dark:border-slate-800 shadow-xs mb-6 transition-colors">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 hover:text-stone-900 dark:hover:text-white text-xs sm:text-sm font-semibold transition-all group cursor-pointer border border-stone-200 dark:border-slate-700"
      >
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#006C35] dark:text-emerald-400" />
        <span>{backText}</span>
      </button>

      {/* Path Trail */}
      <nav aria-label="مسار التنقل" className="flex items-center gap-1.5 text-xs sm:text-sm overflow-x-auto py-1">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1 text-stone-500 dark:text-slate-400 hover:text-[#006C35] dark:hover:text-emerald-400 font-medium transition-colors"
          title="الرئيسية"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">الرئيسية</span>
        </button>

        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-300 dark:text-slate-600 shrink-0" />
            {item.path && !item.active ? (
              <button
                onClick={() => onNavigate(item.path!)}
                className="text-stone-600 dark:text-slate-300 hover:text-[#006C35] dark:hover:text-emerald-400 font-medium transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-[#006C35] dark:text-emerald-400 font-bold whitespace-nowrap">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};
