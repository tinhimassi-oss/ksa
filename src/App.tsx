/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Breadcrumb, BreadcrumbItem } from './components/Breadcrumb';
import { HeroSection } from './components/HeroSection';
import { GradeGrid } from './components/GradeGrid';
import { TermSelection } from './components/TermSelection';
import { PeriodSelection } from './components/PeriodSelection';
import { PeriodTestsList } from './components/PeriodTestsList';
import { QuizPlayer } from './components/QuizPlayer';
import { QuizResult } from './components/QuizResult';
import { HistoryModal } from './components/HistoryModal';
import { CertificateModal } from './components/CertificateModal';
import { StaticPages, StaticPageType } from './components/StaticPages';
import { Footer } from './components/Footer';

import { GRADES_DATA, getGradeById, getTermById, getPeriodById } from './data/grades';
import { testService } from './services/testService';
import { updateSEO } from './utils/seo';
import { toEasternNumerals } from './utils/numerals';
import { TestItem, QuizResultData, TermId, PeriodId } from './types';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';

type RouteState =
  | { view: 'home' }
  | { view: 'search'; searchQuery: string }
  | { view: 'term-selection'; gradeId: number }
  | { view: 'period-selection'; gradeId: number; termId: TermId }
  | { view: 'period-tests'; gradeId: number; termId: TermId; periodId: PeriodId }
  | { view: 'quiz'; testId: string }
  | { view: 'static'; pageType: StaticPageType };

// Helper to determine initial path, supporting legacy hash redirect for SEO
function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  if (window.location.hash) {
    const hashClean = window.location.hash.replace(/^#\/?/, '/');
    const target = hashClean.startsWith('/') ? hashClean : `/${hashClean}`;
    window.history.replaceState(null, '', target);
    return target;
  }
  return window.location.pathname || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [tests, setTests] = useState<TestItem[]>([]);
  const [countsByGrade, setCountsByGrade] = useState<Record<number, number>>({});
  const [currentQuizResult, setCurrentQuizResult] = useState<QuizResultData | null>(null);

  // Modals
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<QuizResultData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dark Mode / Night Mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html element & persist
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load tests & counts
  const loadData = async () => {
    const all = await testService.getAllTests();
    setTests(all);
    const counts = await testService.getCountsByGrade();
    setCountsByGrade(counts);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Web History Mode (popstate & hash migration listener)
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash) {
        const hashClean = window.location.hash.replace(/^#\/?/, '/');
        const target = hashClean.startsWith('/') ? hashClean : `/${hashClean}`;
        window.history.replaceState(null, '', target);
        setCurrentPath(target);
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // HTML5 History navigation helper
  const navigate = (path: string) => {
    const clean = path.replace(/^#\/?/, '/');
    const target = clean.startsWith('/') ? clean : `/${clean}`;
    if (window.location.pathname !== target) {
      window.history.pushState(null, '', target);
    }
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Parse route parameters from clean pathname (Web History Mode)
  const routeState = useMemo<RouteState>(() => {
    const path = currentPath.replace(/^\//, '');
    const parts = path.split('/').filter(Boolean);

    // Static pages
    if (parts[0] === 'privacy-policy') {
      return { view: 'static', pageType: 'privacy-policy' };
    }
    if (parts[0] === 'terms-of-use') {
      return { view: 'static', pageType: 'terms-of-use' };
    }
    if (parts[0] === 'contact-us') {
      return { view: 'static', pageType: 'contact-us' };
    }
    if (parts[0] === 'about-us') {
      return { view: 'static', pageType: 'about-us' };
    }

    // /search/:query
    if (parts[0] === 'search') {
      const q = decodeURIComponent(parts[1] || searchQuery || '');
      return { view: 'search', searchQuery: q };
    }

    // /quiz/:testId
    if (parts[0] === 'quiz' && parts[1]) {
      return { view: 'quiz', testId: parts[1] };
    }

    // /grade/:gradeId/term/:termId/period/:periodId
    if (
      parts[0] === 'grade' &&
      parts[1] &&
      parts[2] === 'term' &&
      parts[3] &&
      parts[4] === 'period' &&
      parts[5]
    ) {
      const gradeId = parseInt(parts[1], 10);
      const termId = parseInt(parts[3], 10) as TermId;
      const periodId = parts[5] as PeriodId;
      return {
        view: 'period-tests',
        gradeId,
        termId,
        periodId,
      };
    }

    // /grade/:gradeId/term/:termId
    if (parts[0] === 'grade' && parts[1] && parts[2] === 'term' && parts[3]) {
      const gradeId = parseInt(parts[1], 10);
      const termId = parseInt(parts[3], 10) as TermId;
      return {
        view: 'period-selection',
        gradeId,
        termId,
      };
    }

    // /grade/:gradeId
    if (parts[0] === 'grade' && parts[1]) {
      const gradeId = parseInt(parts[1], 10);
      return {
        view: 'term-selection',
        gradeId,
      };
    }

    // Default Home
    return { view: 'home' };
  }, [currentPath, searchQuery]);

  // Dynamic SEO updater according to routeState
  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : undefined;
    if (routeState.view === 'home') {
      updateSEO({
        title: 'إختبارات المدرسة السعودية | منصة الاختبارات المدرسية المباشرة',
        description:
          'إختبارات المدرسة السعودية - منصة تفاعلية وطنية لجميع طلاب المملكة العربية السعودية لحل واستعراض الاختبارات المدرسية المباشرة لـ ١٢ صفاً دراسياً من الصف الأول الابتدائي حتى الثالث الثانوي.',
        url: currentUrl,
      });
    } else if (routeState.view === 'static') {
      const titles: Record<StaticPageType, string> = {
        'privacy-policy': 'سياسة الخصوصية',
        'terms-of-use': 'شروط الاستخدام',
        'contact-us': 'اتصل بنا',
        'about-us': 'من نحن',
      };
      updateSEO({
        title: `${titles[routeState.pageType]} | إختبارات المدرسة السعودية`,
        description: `صفحة ${titles[routeState.pageType]} في منصة إختبارات المدرسة السعودية لطلاب ومعلمي المملكة.`,
        url: currentUrl,
      });
    } else if (routeState.view === 'term-selection') {
      const grade = getGradeById(routeState.gradeId);
      if (grade) {
        updateSEO({
          title: `اختبارات ${grade.name} - الفصلين الأول والثاني`,
          description: `استعرض اختبارات ${grade.name} للفصل الدراسي الأول والفصل الدراسي الثاني، ونماذج الفترات والاختبارات النهائية.`,
          url: currentUrl,
        });
      }
    } else if (routeState.view === 'period-selection') {
      const grade = getGradeById(routeState.gradeId);
      const term = getTermById(routeState.termId);
      if (grade && term) {
        const isHighSchool = grade.stage === 'high' || grade.id >= 10;
        updateSEO({
          title: `اختبارات ${term.name} - ${grade.name}`,
          description: isHighSchool
            ? `اختر الاختبارات الفترية أو الاختبارات النهائية لـ ${grade.name}، ${term.name}.`
            : `اختر الفترة الأولى أو الفترة الثانية أو الاختبارات النهائية لـ ${grade.name}، ${term.name}.`,
          url: currentUrl,
        });
      }
    } else if (routeState.view === 'period-tests') {
      const grade = getGradeById(routeState.gradeId);
      const term = getTermById(routeState.termId);
      const period = getPeriodById(routeState.periodId);
      if (grade && term && period) {
        updateSEO({
          title: `${period.name} - ${grade.shortName}، ${term.name}`,
          description: `نماذج أسئلة وحلول ${period.name} لـ ${grade.shortName} في ${term.name}. حل مباشر تفاعلي مع رصد الدرجة.`,
          url: currentUrl,
        });
      }
    } else if (routeState.view === 'quiz') {
      const target = tests.find((t) => t.id === routeState.testId);
      if (target) {
        if (target.seoArticle) {
          updateSEO({
            title: target.seoArticle.h1,
            description: target.seoArticle.metaDescription,
            url: currentUrl,
          });
        } else {
          updateSEO({
            title: `حل ${target.testTitle}`,
            description: `ابدأ الآن حل ${target.testTitle} في مادة ${target.subject} بنظام سؤال يتلوه سؤال تفاعلي.`,
            url: currentUrl,
          });
        }
      }
    }
  }, [routeState, tests]);

  // Back Navigation Handlers
  const handleBack = () => {
    if (routeState.view === 'static') {
      navigate('/');
    } else if (routeState.view === 'quiz' || currentQuizResult) {
      if (currentQuizResult) {
        setCurrentQuizResult(null);
      }
      window.history.back();
    } else if (routeState.view === 'period-tests') {
      navigate(`/grade/${routeState.gradeId}/term/${routeState.termId}`);
    } else if (routeState.view === 'period-selection') {
      navigate(`/grade/${routeState.gradeId}`);
    } else if (routeState.view === 'term-selection') {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  // Breadcrumb items generator
  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [];

    if (routeState.view === 'static') {
      const titles: Record<StaticPageType, string> = {
        'privacy-policy': 'سياسة الخصوصية',
        'terms-of-use': 'شروط الاستخدام',
        'contact-us': 'اتصل بنا',
        'about-us': 'من نحن',
      };
      items.push({
        label: titles[routeState.pageType],
        active: true,
      });
      return items;
    }

    if (
      routeState.view === 'term-selection' ||
      routeState.view === 'period-selection' ||
      routeState.view === 'period-tests'
    ) {
      const grade = getGradeById(routeState.gradeId);
      if (grade) {
        items.push({
          label: grade.shortName,
          path: `/grade/${grade.id}`,
          active: routeState.view === 'term-selection',
        });
      }
    }

    if (routeState.view === 'period-selection' || routeState.view === 'period-tests') {
      const term = getTermById(routeState.termId);
      if (term) {
        items.push({
          label: term.name,
          path: `/grade/${routeState.gradeId}/term/${term.id}`,
          active: routeState.view === 'period-selection',
        });
      }
    }

    if (routeState.view === 'period-tests') {
      const period = getPeriodById(routeState.periodId);
      if (period) {
        items.push({
          label: period.name,
          active: true,
        });
      }
    }

    return items;
  }, [routeState]);

  // Handle finishing a quiz
  const handleFinishQuiz = (result: QuizResultData) => {
    testService.recordAttempt(result);
    setCurrentQuizResult(result);
  };

  // Handle search submission from Hero
  const handleSearch = (query: string) => {
    if (!query) {
      navigate('/');
      return;
    }
    setSearchQuery(query);
    navigate(`/search/${encodeURIComponent(query)}`);
  };

  // Search Results view
  const searchResults = useMemo(() => {
    if (routeState.view !== 'search') return [];
    const q = (routeState.searchQuery || '').toLowerCase();
    return tests.filter(
      (t) =>
        t.testTitle.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        (t.authorName && t.authorName.toLowerCase().includes(q)) ||
        (t.seoArticle &&
          (t.seoArticle.h1.toLowerCase().includes(q) ||
            (t.seoArticle.targetKeywords || t.seoArticle.keywords || []).some((kw) =>
              kw.toLowerCase().includes(q)
            )))
    );
  }, [routeState, tests]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-950 font-sans text-stone-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#006C35] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#D4AF37] animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenHistoryModal={() => setShowHistoryModal(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Render Views based on routeState */}

        {/* 1. HOME VIEW */}
        {routeState.view === 'home' && (
          <>
            <HeroSection
              onSearch={handleSearch}
              onNavigate={navigate}
              onExploreGrades={() => {
                const el = document.getElementById('grades-grid');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <div id="grades-grid">
              <GradeGrid
                grades={GRADES_DATA}
                countsByGrade={countsByGrade}
                onSelectGrade={(gradeId) => navigate(`/grade/${gradeId}`)}
              />
            </div>
          </>
        )}

        {/* 2. TERM SELECTION (اختبارات الفصل الأول / اختبارات الفصل الثاني) */}
        {routeState.view === 'term-selection' && (
          <>
            <Breadcrumb
              items={breadcrumbItems}
              onNavigate={navigate}
              onBack={handleBack}
              backText="رجوع للرئيسية"
            />
            {(() => {
              const grade = getGradeById(routeState.gradeId);
              if (!grade) {
                return (
                  <div className="text-center py-16">
                    <p className="text-lg font-bold">الصف المطلوب غير متوفر</p>
                    <button
                      onClick={() => navigate('/')}
                      className="mt-4 px-4 py-2 bg-[#006C35] text-white rounded-xl text-sm font-bold"
                    >
                      العودة للرئيسية
                    </button>
                  </div>
                );
              }
              return (
                <TermSelection
                  grade={grade}
                  onSelectTerm={(termId) =>
                    navigate(`/grade/${grade.id}/term/${termId}`)
                  }
                />
              );
            })()}
          </>
        )}

        {/* 3. PERIOD SELECTION (اختبارات الفترة الأولى، الثانية، النهائية) */}
        {routeState.view === 'period-selection' && (
          <>
            <Breadcrumb
              items={breadcrumbItems}
              onNavigate={navigate}
              onBack={handleBack}
              backText="رجوع لاختيار الفصل"
            />
            {(() => {
              const grade = getGradeById(routeState.gradeId);
              const term = getTermById(routeState.termId);
              if (!grade || !term) {
                return (
                  <div className="text-center py-16">
                    <p className="text-lg font-bold">البيانات غير متوفرة</p>
                    <button
                      onClick={() => navigate('/')}
                      className="mt-4 px-4 py-2 bg-[#006C35] text-white rounded-xl text-sm font-bold"
                    >
                      العودة للرئيسية
                    </button>
                  </div>
                );
              }
              return (
                <PeriodSelection
                  grade={grade}
                  term={term}
                  onSelectPeriod={(periodId) =>
                    navigate(
                      `/grade/${grade.id}/term/${term.id}/period/${periodId}`
                    )
                  }
                />
              );
            })()}
          </>
        )}

        {/* 4. PERIOD TESTS LIST */}
        {routeState.view === 'period-tests' && (
          <>
            <Breadcrumb
              items={breadcrumbItems}
              onNavigate={navigate}
              onBack={handleBack}
              backText={
                routeState.gradeId && getGradeById(routeState.gradeId)?.stage === 'high'
                  ? 'رجوع لاختيار الاختبار'
                  : 'رجوع لاختيار الفترة'
              }
            />
            {(() => {
              const grade = getGradeById(routeState.gradeId);
              const term = getTermById(routeState.termId);
              const period = getPeriodById(routeState.periodId);
              if (!grade || !term || !period) {
                return (
                  <div className="text-center py-16">
                    <p className="text-lg font-bold">القسم غير متوفر</p>
                    <button
                      onClick={() => navigate('/')}
                      className="mt-4 px-4 py-2 bg-[#006C35] text-white rounded-xl text-sm font-bold"
                    >
                      العودة للرئيسية
                    </button>
                  </div>
                );
              }

              const matchingTests = tests.filter(
                (t) =>
                  t.gradeId === grade.id &&
                  t.term === term.id &&
                  (t.period === period.id ||
                    (grade.stage === 'high' && period.id === 'periodic' && t.period === 'first_period'))
              );

              return (
                <PeriodTestsList
                  grade={grade}
                  term={term}
                  period={period}
                  tests={matchingTests}
                  onStartQuiz={(testId) => navigate(`/quiz/${testId}`)}
                />
              );
            })()}
          </>
        )}

        {/* 5. QUIZ PLAYER OR RESULT */}
        {routeState.view === 'quiz' && (
          <>
            {(() => {
              const activeTest = tests.find((t) => t && t.id === routeState.testId);
              if (!activeTest) {
                return (
                  <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
                    <p className="text-lg font-bold text-stone-800">
                      الاختبار المطلوب غير موجود
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="mt-4 px-5 py-2.5 bg-[#006C35] text-white rounded-xl text-sm font-bold"
                    >
                      العودة للرئيسية
                    </button>
                  </div>
                );
              }

              const grade = getGradeById(activeTest.gradeId);
              const term = getTermById(activeTest.term);
              const period = getPeriodById(activeTest.period);

              // If results are available, show celebratory results
              if (currentQuizResult && currentQuizResult.testId === activeTest.id) {
                return (
                  <QuizResult
                    result={currentQuizResult}
                    test={activeTest}
                    onRetry={() => setCurrentQuizResult(null)}
                    onBackToList={() => {
                      setCurrentQuizResult(null);
                      navigate(
                        `/grade/${activeTest.gradeId}/term/${activeTest.term}/period/${activeTest.period}`
                      );
                    }}
                    onOpenCertificate={() =>
                      setActiveCertificate({ ...currentQuizResult })
                    }
                  />
                );
              }

              return (
                <QuizPlayer
                  test={activeTest}
                  gradeName={grade?.name || 'الصف المحدد'}
                  termName={term?.name || 'الفصل المحدد'}
                  periodName={period?.name || 'الفترة المحددة'}
                  onFinish={handleFinishQuiz}
                  onCancel={() => {
                    navigate(
                      `/grade/${activeTest.gradeId}/term/${activeTest.term}/period/${activeTest.period}`
                    );
                  }}
                />
              );
            })()}
          </>
        )}

        {/* 6. SEARCH RESULTS VIEW */}
        {routeState.view === 'search' && (
          <div className="max-w-5xl mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Search className="w-6 h-6 text-[#006C35] dark:text-emerald-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                  نتائج البحث عن: «{routeState.searchQuery}»
                </h2>
              </div>
              <button
                onClick={() => navigate('/')}
                className="text-xs sm:text-sm font-bold text-[#006C35] dark:text-emerald-400 hover:underline"
              >
                العودة للرئيسية
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800">
                <p className="text-stone-600 dark:text-slate-300 font-bold mb-2">
                  لم نتمكن من العثور على اختبارات مطابقة لبحثك
                </p>
                <p className="text-xs text-stone-400 dark:text-slate-500">
                  جرب البحث باسم مادة أخرى أو تصفح الصفوف الدراسية من الصفحة الرئيسية
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((t) => {
                  const gr = getGradeById(t.gradeId);
                  return (
                    <div
                      key={t.id}
                      className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-stone-200 dark:border-slate-800 hover:border-[#006C35] dark:hover:border-emerald-500 shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-white bg-[#006C35] dark:bg-emerald-700 px-2 py-0.5 rounded">
                            {gr?.shortName}
                          </span>
                          <span className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                            {t.subject}
                          </span>
                        </div>
                        <h3 className="font-bold text-stone-900 dark:text-white text-base">
                          {t.testTitle}
                        </h3>
                      </div>
                      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                          {toEasternNumerals(t.questions.length)} أسئلة ·{' '}
                          {toEasternNumerals(t.totalMarks)} درجات
                        </span>
                        <button
                          onClick={() => navigate(`/quiz/${t.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-[#006C35] hover:bg-[#004D25] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          ابدء الإختبار
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 7. STATIC PAGES (سياسة الخصوصية، شروط الاستخدام، اتصل بنا، من نحن) */}
        {routeState.view === 'static' && (
          <>
            <Breadcrumb
              items={breadcrumbItems}
              onNavigate={navigate}
              onBack={() => navigate('/')}
              backText="رجوع للرئيسية"
            />
            <StaticPages
              pageType={routeState.pageType}
              onNavigateHome={() => navigate('/')}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectGrade={(gradeId) => navigate(`/grade/${gradeId}`)}
        onNavigatePage={navigate}
      />

      {/* Student History Modal */}
      {showHistoryModal && (
        <HistoryModal
          attempts={testService.getAttempts()}
          onClose={() => setShowHistoryModal(false)}
          onViewCertificate={(res) => {
            setShowHistoryModal(false);
            setActiveCertificate(res);
          }}
        />
      )}

      {/* Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          result={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  );
}
