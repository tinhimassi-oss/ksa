import React, { useState, useRef, useEffect } from 'react';
import { GRADES_DATA } from '../data/grades';
import { GradeInfo } from '../types';
import {
  ChevronDown,
  BookOpen,
  Atom,
  Award,
  ArrowLeft,
  Moon,
  Sun,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenHistoryModal: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenHistoryModal,
  darkMode = false,
  onToggleDarkMode,
}) => {
  // 'elem' | 'mid' | 'high' | null
  const [openStage, setOpenStage] = useState<'elem' | 'mid' | 'high' | null>(null);

  // Group grades by educational stage
  const elementaryGrades = GRADES_DATA.filter((g) => g.stage === 'elementary');
  const middleGrades = GRADES_DATA.filter((g) => g.stage === 'middle');
  const highGrades = GRADES_DATA.filter((g) => g.stage === 'high');

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenStage(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleStage = (stage: 'elem' | 'mid' | 'high', e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setOpenStage((prev) => (prev === stage ? null : stage));
  };

  const handleSelectGrade = (gradeId: number) => {
    setOpenStage(null);
    onNavigate(`/grade/${gradeId}`);
  };

  // Exact names specified by the user
  const getDropdownTitle = (grade: GradeInfo) => {
    if (grade.stage === 'elementary') {
      const titles: Record<number, string> = {
        1: 'إختبارات الصف الأول إبتدائي',
        2: 'إختبارات الصف الثاني إبتدائي',
        3: 'إختبارات الصف الثالث إبتدائي',
        4: 'إختبارات الصف الرابع إبتدائي',
        5: 'إختبارات الصف الخامس إبتدائي',
        6: 'إختبارات الصف السادس إبتدائي',
      };
      return titles[grade.id] || `إختبارات ${grade.name}`;
    }
    if (grade.stage === 'middle') {
      const titles: Record<number, string> = {
        7: 'إختبارات الصف الأول متوسط',
        8: 'إختبارات الصف الثاني متوسط',
        9: 'إختبارات الصف الثالث متوسط',
      };
      return titles[grade.id] || `إختبارات ${grade.name}`;
    }
    if (grade.stage === 'high') {
      const titles: Record<number, string> = {
        10: 'إختبارات الصف الأول ثانوي',
        11: 'إختبارات الصف الثاني ثانوي',
        12: 'إختبارات الصف الثالث ثانوي',
      };
      return titles[grade.id] || `إختبارات ${grade.name}`;
    }
    return `إختبارات ${grade.name}`;
  };

  return (
    <header
      className="sticky top-0 z-50 bg-[#006C35] dark:bg-emerald-950 text-white shadow-md border-b-2 border-[#D4AF37] transition-colors"
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4 relative">
          {/* 1. Right side: Brand Logo & Name */}
          <button
            onClick={() => {
              setOpenStage(null);
              onNavigate('/');
            }}
            className="flex items-center gap-2.5 sm:gap-3 text-right group cursor-pointer focus:outline-none shrink-0"
            title="العودة للصفحة الرئيسية"
          >
            {/* Crest Icon */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all flex items-center justify-center border border-[#D4AF37]/50 shadow-inner shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M12 6c-3 0-5-2-5-4 0 3 2 5 5 5zm0 0c3 0 5-2 5-4 0 3-2 5-5 5z" />
                <path d="M7 11c-2 0-3-1-3-3 0 2 1 3 3 3zm10 0c2 0 3-1 3-3 0 2-1 3-3 3z" />
                <path d="M6 18l12-8M18 18L6 10" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-white whitespace-nowrap">
                  إختبارات المدرسة السعودية
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-100/90 font-medium hidden sm:block">
                بنك الاختبارات المدرسية المباشرة لجميع المراحل الدراسية
              </p>
            </div>
          </button>

          {/* 2. Middle area: The 3 Educational Stages */}
          <nav className="flex items-center justify-center gap-1.5 sm:gap-2.5 lg:gap-3 flex-1 px-1">
            {/* (أ) إختبارات المرحلة الإبتدائية */}
            <div className="relative">
              <button
                onClick={(e) => handleToggleStage('elem', e)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer whitespace-nowrap shadow-xs ${
                  openStage === 'elem'
                    ? 'bg-white text-[#006C35] border-white shadow-xl ring-2 ring-[#D4AF37]'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-white border-emerald-600/50 hover:border-emerald-500'
                }`}
                aria-expanded={openStage === 'elem'}
              >
                <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>إختبارات المرحلة الإبتدائية</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    openStage === 'elem' ? 'rotate-180 text-[#006C35]' : 'text-emerald-200'
                  }`}
                />
              </button>

              {/* Dropdown list for Elementary */}
              {openStage === 'elem' && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 text-stone-900 dark:text-slate-100 rounded-2xl shadow-2xl border-2 border-[#006C35] dark:border-emerald-600 z-50 p-3 animate-in fade-in-50 slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Pointer arrow */}
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-white dark:bg-slate-900 border-t-2 border-r-2 border-[#006C35] dark:border-emerald-600 transform -rotate-45" />

                  <div className="relative z-10">
                    <div className="px-3 py-1.5 mb-2 text-xs font-bold text-[#006C35] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg flex items-center justify-between border border-emerald-100 dark:border-emerald-800">
                      <span>صفوف المرحلة الابتدائية</span>
                      <span className="text-stone-500 dark:text-slate-400 font-mono">١ - ٦</span>
                    </div>
                    <div className="space-y-1">
                      {elementaryGrades.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => handleSelectGrade(g.id)}
                          className="w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-emerald-50 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200 hover:text-[#006C35] dark:hover:text-emerald-400 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-emerald-200 dark:hover:border-slate-700"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#006C35] dark:text-emerald-300 group-hover:bg-[#006C35] group-hover:text-white font-extrabold text-xs flex items-center justify-center transition-colors">
                              {g.easternNumber}
                            </span>
                            <span>{getDropdownTitle(g)}</span>
                          </span>
                          <ArrowLeft className="w-4 h-4 text-stone-300 dark:text-slate-600 group-hover:text-[#006C35] dark:group-hover:text-emerald-400 transition-transform group-hover:translate-x-[-2px]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* (ب) إختبارات المرحلة المتوسطة */}
            <div className="relative">
              <button
                onClick={(e) => handleToggleStage('mid', e)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer whitespace-nowrap shadow-xs ${
                  openStage === 'mid'
                    ? 'bg-white text-teal-900 border-white shadow-xl ring-2 ring-[#D4AF37]'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-white border-emerald-600/50 hover:border-emerald-500'
                }`}
                aria-expanded={openStage === 'mid'}
              >
                <Atom className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>إختبارات المرحلة المتوسطة</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    openStage === 'mid' ? 'rotate-180 text-teal-900' : 'text-emerald-200'
                  }`}
                />
              </button>

              {/* Dropdown list for Middle */}
              {openStage === 'mid' && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 text-stone-900 dark:text-slate-100 rounded-2xl shadow-2xl border-2 border-teal-700 dark:border-teal-500 z-50 p-3 animate-in fade-in-50 slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Pointer arrow */}
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-white dark:bg-slate-900 border-t-2 border-r-2 border-teal-700 dark:border-teal-500 transform -rotate-45" />

                  <div className="relative z-10">
                    <div className="px-3 py-1.5 mb-2 text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 rounded-lg flex items-center justify-between border border-teal-100 dark:border-teal-800">
                      <span>صفوف المرحلة المتوسطة</span>
                      <span className="text-stone-500 dark:text-slate-400 font-mono">٧ - ٩</span>
                    </div>
                    <div className="space-y-1">
                      {middleGrades.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => handleSelectGrade(g.id)}
                          className="w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-teal-50 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200 hover:text-teal-900 dark:hover:text-teal-300 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-teal-200 dark:hover:border-slate-700"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 group-hover:bg-teal-800 group-hover:text-white font-extrabold text-xs flex items-center justify-center transition-colors">
                              {g.easternNumber}
                            </span>
                            <span>{getDropdownTitle(g)}</span>
                          </span>
                          <ArrowLeft className="w-4 h-4 text-stone-300 dark:text-slate-600 group-hover:text-teal-800 dark:group-hover:text-teal-300 transition-transform group-hover:translate-x-[-2px]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* (ج) إختبارات المرحلة الثانوية */}
            <div className="relative">
              <button
                onClick={(e) => handleToggleStage('high', e)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer whitespace-nowrap shadow-xs ${
                  openStage === 'high'
                    ? 'bg-white text-amber-950 border-white shadow-xl ring-2 ring-[#D4AF37]'
                    : 'bg-emerald-800/80 hover:bg-emerald-700 text-white border-emerald-600/50 hover:border-emerald-500'
                }`}
                aria-expanded={openStage === 'high'}
              >
                <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>إختبارات المرحلة الثانوية</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    openStage === 'high' ? 'rotate-180 text-amber-950' : 'text-emerald-200'
                  }`}
                />
              </button>

              {/* Dropdown list for High School */}
              {openStage === 'high' && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 text-stone-900 dark:text-slate-100 rounded-2xl shadow-2xl border-2 border-amber-600 dark:border-amber-500 z-50 p-3 animate-in fade-in-50 slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Pointer arrow */}
                  <div className="absolute -top-2 right-8 w-4 h-4 bg-white dark:bg-slate-900 border-t-2 border-r-2 border-amber-600 dark:border-amber-500 transform -rotate-45" />

                  <div className="relative z-10">
                    <div className="px-3 py-1.5 mb-2 text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 rounded-lg flex items-center justify-between border border-amber-100 dark:border-amber-800">
                      <span>صفوف المرحلة الثانوية (مسارات)</span>
                      <span className="text-stone-500 dark:text-slate-400 font-mono">١٠ - ١٢</span>
                    </div>
                    <div className="space-y-1">
                      {highGrades.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => handleSelectGrade(g.id)}
                          className="w-full text-right px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-amber-50 dark:hover:bg-slate-800 text-stone-800 dark:text-slate-200 hover:text-amber-900 dark:hover:text-amber-300 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-amber-200 dark:hover:border-slate-700"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 group-hover:bg-amber-800 group-hover:text-white font-extrabold text-xs flex items-center justify-center transition-colors">
                              {g.easternNumber}
                            </span>
                            <span>{getDropdownTitle(g)}</span>
                          </span>
                          <ArrowLeft className="w-4 h-4 text-stone-300 dark:text-slate-600 group-hover:text-amber-900 dark:group-hover:text-amber-300 transition-transform group-hover:translate-x-[-2px]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Left side: Dark Mode Toggle & My Achievements Text Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Night / Dark Mode Toggle Icon */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="px-2.5 sm:px-3 py-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white hover:text-[#D4AF37] text-xs sm:text-sm font-bold transition-all border border-emerald-600/50 flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                title={darkMode ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
                aria-label={darkMode ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
              >
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-300" />
                    <span className="hidden md:inline">الوضع النهاري</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-emerald-200" />
                    <span className="hidden md:inline">الوضع الليلي</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onOpenHistoryModal}
              className="px-3.5 py-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 hover:text-[#D4AF37] text-xs sm:text-sm font-bold transition-all border border-emerald-600/50 text-white cursor-pointer shadow-xs whitespace-nowrap"
              title="سجل نتائج الاختبارات والشهادات"
            >
              <span>إنجازاتي</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
