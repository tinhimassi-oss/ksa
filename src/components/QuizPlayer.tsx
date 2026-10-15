import React, { useState, useEffect } from 'react';
import { TestItem, Question, QuizResultData, QuizAnswer } from '../types';
import { toEasternNumerals, formatTimeEastern, getArabicOptionLetter } from '../utils/numerals';
import { ArticleSection } from './ArticleSection';
import {
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Send,
  AlertCircle,
  X,
  BookOpen,
} from 'lucide-react';

interface QuizPlayerProps {
  test: TestItem;
  gradeName: string;
  termName: string;
  periodName: string;
  onFinish: (result: QuizResultData) => void;
  onCancel: () => void;
}

// Simple Web Audio API synthesized gentle sound effect
function playTone(type: 'select' | 'finish') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'select') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.25); // C6
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch {
    // Ignore audio permission restrictions
  }
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  test,
  gradeName,
  termName,
  periodName,
  onFinish,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const scrollToArticle = () => {
    const el = document.getElementById('seo-article');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    console.log('QuizPlayer mounted with test:', test);
  }, [test]);

  const currentQuestion: Question | undefined = test.questions?.[currentIndex];
  
  // Debug log
  useEffect(() => {
    if (!currentQuestion) {
      console.warn('Current question is undefined!', { currentIndex, questions: test.questions });
    }
  }, [currentQuestion, currentIndex, test.questions]);

  const totalQuestions = test.questions?.length ?? 0;
  const progressPercent = Math.round(((currentIndex + 1) / (totalQuestions || 1)) * 100);

  // Timer starts immediately when entering test
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!currentQuestion) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-bold">لا توجد أسئلة في هذا الاختبار.</p>
        <button
          onClick={onCancel}
          className="mt-4 px-5 py-2.5 bg-[#006C35] text-white rounded-xl text-sm font-bold"
        >
          العودة
        </button>
      </div>
    );
  }

  const handleSelectOption = (optionIndex: number) => {
    playTone('select');
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
    setWarningMessage(null);
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestion.id] === undefined) {
      setWarningMessage('فضلاً اختر إجابة قبل الانتقال للسؤال التالي');
      return;
    }
    setWarningMessage(null);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setWarningMessage(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Check if any question remains unanswered
    const unanswered = test.questions.filter((q) => selectedAnswers[q.id] === undefined);
    if (unanswered.length > 0) {
      setWarningMessage(`تبقى لديك ${toEasternNumerals(unanswered.length)} أسئلة دون إجابة، يرجى الإجابة عليها.`);
      return;
    }

    playTone('finish');

    // Calculate score
    let earnedMarks = 0;
    const answersData: QuizAnswer[] = test.questions.map((q) => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) {
        earnedMarks += q.points ?? 1;
      }
      return {
        questionId: q.id,
        selectedOptionIndex: selected,
        isCorrect,
      };
    });

    const percentage = Math.round((earnedMarks / test.totalMarks) * 100);
    const passed = percentage >= 60;

    const result: QuizResultData = {
      testId: test.id,
      testTitle: test.testTitle,
      gradeName,
      termName,
      periodName,
      studentName: '',
      score: earnedMarks,
      totalMarks: test.totalMarks,
      percentage,
      timeTakenSeconds: elapsedSeconds,
      answers: answersData,
      passed,
      date: new Date().toLocaleDateString('ar-SA'),
    };

    onFinish(result);
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Quiz Top Status Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-stone-200 dark:border-slate-800 p-4 shadow-xs mb-6 transition-colors">
        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Question Counter (Eastern Numerals: سؤال ١ من ٥) */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-[#006C35] dark:text-emerald-400 font-extrabold flex items-center justify-center text-xs">
              {toEasternNumerals(currentIndex + 1)}
            </span>
            <span className="font-bold text-stone-700 dark:text-slate-200">
              السؤال {toEasternNumerals(currentIndex + 1)} من {toEasternNumerals(totalQuestions)}
            </span>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-1.5 font-bold text-stone-600 dark:text-slate-300 bg-stone-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
            <span className="font-mono text-xs sm:text-sm">
              {formatTimeEastern(elapsedSeconds)}
            </span>
          </div>

          {/* Grade & Period Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-600 dark:text-slate-300 font-bold truncate max-w-[200px] bg-stone-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg">
            <span className="truncate">{gradeName} • {periodName}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {test.seoArticle && (
              <button
                onClick={scrollToArticle}
                className="flex items-center gap-1 text-xs text-[#006C35] dark:text-emerald-400 hover:text-emerald-700 font-bold transition-colors cursor-pointer py-1.5 px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800"
                title="الانتقال إلى دليل المذاكرة والمقال التعليمي بالأسفل"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">دليل المذاكرة والمقال</span>
              </button>
            )}

            {/* Cancel & Exit Button */}
            <button
              onClick={onCancel}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 font-bold transition-colors cursor-pointer py-1.5 px-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-slate-800 border border-transparent hover:border-stone-200 dark:hover:border-slate-700"
              title="الخروج من الاختبار والعودة"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">إنهاء والعودة</span>
            </button>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-stone-100 dark:bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-linear-to-r from-emerald-600 to-[#D4AF37] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* The Single Question Card (سؤال يتلوه سؤال) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-stone-200 dark:border-slate-800 p-6 sm:p-8 shadow-md transition-colors">
        {/* Question Header & Points */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#006C35] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              سؤال اختياري
            </span>
          </div>
          <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            {toEasternNumerals(currentQuestion.points ?? 1)} درجات
          </span>
        </div>

        {/* Question Body */}
        <h3 className="text-lg sm:text-2xl font-extrabold text-stone-900 dark:text-slate-100 leading-relaxed mb-4">
          {currentQuestion.questionText}
        </h3>

        {/* Optional Question Image */}
        {currentQuestion.imageUrl && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-850 p-3 flex justify-center">
            <img
              src={currentQuestion.imageUrl}
              alt="صورة توضيحية للسؤال"
              className="max-h-60 sm:max-h-72 w-auto object-contain rounded-xl shadow-xs"
              loading="lazy"
            />
          </div>
        )}

        {/* Multiple Choice Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;
            const letter = getArabicOptionLetter(idx);

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-right p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'border-[#006C35] dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs text-stone-900 dark:text-white ring-2 ring-[#006C35]/20 dark:ring-emerald-500/30'
                    : 'border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800/80 text-stone-700 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1">
                  {/* Option Letter Marker (أ، ب، ج، د) */}
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#006C35] text-white shadow-xs'
                        : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm sm:text-base font-semibold">
                    {option}
                  </span>
                </div>

                {/* Selection Indicator Check */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'border-[#006C35] dark:border-emerald-400 bg-[#006C35] dark:bg-emerald-500 text-white'
                      : 'border-stone-300 dark:border-slate-600'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Warning Toast */}
        {warningMessage && (
          <div className="mt-5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{warningMessage}</span>
          </div>
        )}

        {/* Bottom Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between gap-3">
          {/* Previous Question Button */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-stone-100 dark:bg-slate-800 text-stone-400 dark:text-slate-500'
                : 'bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 cursor-pointer'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          {/* Next or Finish Button */}
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#006C35] hover:bg-[#004D25] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all transform active:scale-95 cursor-pointer"
            >
              <span>السؤال التالي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c59b27] text-stone-900 font-extrabold text-xs sm:text-sm shadow-lg transition-all transform active:scale-95 ring-2 ring-[#D4AF37]/50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>تسليم الاختبار وإظهار النتيجة</span>
            </button>
          )}
        </div>
      </div>

      {/* Educational Article Section directly integrated and always visible at bottom */}
      <ArticleSection test={test} />
    </div>
  );
};
