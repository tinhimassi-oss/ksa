import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizResultData, TestItem } from '../types';
import { toEasternNumerals, formatTimeEastern, getArabicOptionLetter } from '../utils/numerals';
import { testService } from '../services/testService';
import { ArticleSection } from './ArticleSection';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Printer,
  Sparkles,
  ArrowRight,
  BookOpen,
  User,
  FileText,
} from 'lucide-react';

interface QuizResultProps {
  result: QuizResultData;
  test: TestItem;
  onRetry: () => void;
  onBackToList: () => void;
  onOpenCertificate: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  test,
  onRetry,
  onBackToList,
  onOpenCertificate,
}) => {
  const [studentName, setStudentName] = useState<string>(
    result.studentName || testService.getSavedStudentName() || ''
  );

  const scrollToArticle = () => {
    const el = document.getElementById('seo-article');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNameChange = (val: string) => {
    setStudentName(val);
    result.studentName = val;
    testService.updateLastAttemptStudentName(val);
  };

  const handleOpenCertificate = () => {
    if (!result.studentName && studentName) {
      result.studentName = studentName;
    }
    onOpenCertificate();
  };

  // Fire celebratory confetti if high score
  useEffect(() => {
    if (result.percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#006C35', '#D4AF37', '#ffffff', '#22c55e'],
        });
      } catch {
        // safe ignore
      }
    }
  }, [result.percentage]);

  const isExcellent = result.percentage >= 85;
  const isGood = result.percentage >= 60;

  let praiseTitle = 'ما شاء الله! بطل متفوق وفخر للوطن!';
  let praiseSub = 'أداء مبهر وإتقان متميز للمهارات، نفتخر بتميزك واستمرارك في طلب العلم.';

  if (!isGood) {
    praiseTitle = 'محاولة جيدة، وبإمكانك تحقيق الأفضل!';
    praiseSub = 'راجع الأسئلة أدناه واقرأ التوضيح لتعزيز معلوماتك ثم أعد المحاولة لتنال الدرجة الكاملة.';
  } else if (!isExcellent) {
    praiseTitle = 'أحسنت صنعاً! نتيجة مباركة ورائعة';
    praiseSub = 'أنت على الطريق الصحيح نحو القمة والامتياز، بارك الله في همتك.';
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Celebration Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-xl text-center mb-8 relative overflow-hidden transition-colors">
        {/* Subtle decorative ribbons */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#006C35] dark:text-emerald-400 mx-auto flex items-center justify-center mb-4 border-2 border-emerald-200 dark:border-emerald-800 shadow-inner">
          {isGood ? (
            <Trophy className="w-10 h-10 text-[#D4AF37]" />
          ) : (
            <Award className="w-10 h-10 text-stone-500 dark:text-slate-400" />
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#006C35] dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>النتيجة النهائية للاختبار المباشر</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mb-2">
          {praiseTitle}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
          {praiseSub}
        </p>

        {/* Score Visual Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-6">
          <div className="bg-stone-50 dark:bg-slate-800 p-3 rounded-2xl border border-stone-200 dark:border-slate-700">
            <span className="text-xs text-stone-500 dark:text-slate-400 font-medium block">الدرجة المستحقة</span>
            <span className="text-xl sm:text-2xl font-extrabold text-[#006C35] dark:text-emerald-400">
              {toEasternNumerals(result.score)} / {toEasternNumerals(result.totalMarks)}
            </span>
          </div>

          <div className="bg-stone-50 dark:bg-slate-800 p-3 rounded-2xl border border-stone-200 dark:border-slate-700">
            <span className="text-xs text-stone-500 dark:text-slate-400 font-medium block">النسبة المئوية</span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white">
              {toEasternNumerals(result.percentage)}٪
            </span>
          </div>

          <div className="bg-stone-50 dark:bg-slate-800 p-3 rounded-2xl border border-stone-200 dark:border-slate-700">
            <span className="text-xs text-stone-500 dark:text-slate-400 font-medium block">الوقت المستغرق</span>
            <span className="text-xl sm:text-2xl font-extrabold text-stone-700 dark:text-slate-200">
              {formatTimeEastern(result.timeTakenSeconds)}
            </span>
          </div>

          <div className="bg-stone-50 dark:bg-slate-800 p-3 rounded-2xl border border-stone-200 dark:border-slate-700">
            <span className="text-xs text-stone-500 dark:text-slate-400 font-medium block">التقدير العام</span>
            <span className="text-base sm:text-lg font-extrabold text-[#D4AF37] mt-1 block">
              {result.percentage >= 90
                ? 'ممتاز مرتفع'
                : result.percentage >= 80
                ? 'جيد جداً'
                : result.percentage >= 60
                ? 'جيد'
                : 'يحتاج لمراجعة'}
            </span>
          </div>
        </div>

        {/* Printable Certificate Section (كتابة اسم الطالب بعد نهاية الاختبار والطباعة) */}
        <div className="bg-linear-to-b from-amber-50/80 via-white to-emerald-50/50 dark:from-slate-850 dark:via-slate-900 dark:to-slate-900 border-2 border-[#D4AF37] rounded-3xl p-5 sm:p-6 max-w-xl mx-auto mb-6 shadow-sm text-right">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-[#D4AF37] flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-700">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white">
                الشهادة القابلة للطباعة 🎓
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                اكتب اسم الطالب / الطالبة لطباعة وحفظ شهادة التقدير الرسمية بعد إتمام الاختبار:
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#006C35] dark:text-emerald-400" />
                <span>اسم الطالب / الطالبة للشهادة:</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="اكتب اسمك الثلاثي هنا ليظهر في الشهادة..."
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-300 dark:border-slate-700 focus:border-[#006C35] dark:focus:border-emerald-500 focus:outline-none text-stone-900 dark:text-white font-bold text-sm bg-white dark:bg-slate-800 shadow-xs"
              />
            </div>

            <button
              onClick={handleOpenCertificate}
              className="w-full py-3.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#c59b27] text-stone-900 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-stone-900" />
              <span>عرض وطباعة شهادة التفوق (باسمك)</span>
              <Printer className="w-4 h-4 text-stone-900 mr-1" />
            </button>
          </div>
        </div>

        {/* Action Buttons: Retry & Back */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {test.seoArticle && (
            <button
              onClick={scrollToArticle}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 font-bold text-sm transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>دليل المذاكرة والمقال</span>
            </button>
          )}

          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-200 font-bold text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة حل الاختبار</span>
          </button>

          <button
            onClick={onBackToList}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006C35] hover:bg-[#004D25] text-white font-bold text-sm transition-colors cursor-pointer"
          >
            <span>العودة لقائمة الاختبارات</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detailed Question by Question Review */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#006C35] dark:text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
              مراجعة إجابات الأسئلة مع التوضيح
            </h2>
          </div>
          <span className="text-xs text-stone-500 dark:text-slate-400 font-medium">
            {toEasternNumerals(test.questions.length)} أسئلة
          </span>
        </div>

        <div className="space-y-6">
          {test.questions.map((q, idx) => {
            const answerRecord = result.answers.find((a) => a.questionId === q.id);
            const isCorrect = answerRecord?.isCorrect ?? false;
            const chosenOption = answerRecord?.selectedOptionIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  isCorrect
                    ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-red-200 dark:border-red-800 bg-red-50/20 dark:bg-red-950/20'
                }`}
              >
                {/* Question bar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}
                    >
                      {toEasternNumerals(idx + 1)}
                    </span>
                    <h3 className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
                      {q.questionText}
                    </h3>
                  </div>

                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>صحيحة (+{toEasternNumerals(q.points ?? 1)})</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded-full shrink-0">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>غير صحيحة</span>
                    </span>
                  )}
                </div>

                {q.imageUrl && (
                  <div className="my-2 rounded-xl overflow-hidden border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 max-w-xs">
                    <img
                      src={q.imageUrl}
                      alt="توضيح السؤال"
                      className="max-h-36 w-auto object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs sm:text-sm">
                  {q.options.map((opt, optIdx) => {
                    const isTheCorrectOne = optIdx === q.correctAnswerIndex;
                    const isTheChosenOne = optIdx === chosenOption;

                    let optStyle = 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300';
                    if (isTheCorrectOne) {
                      optStyle = 'border-emerald-500 bg-emerald-100/60 dark:bg-emerald-950/70 font-bold text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-400';
                    } else if (isTheChosenOne && !isTheCorrectOne) {
                      optStyle = 'border-red-400 bg-red-100/60 dark:bg-red-950/70 text-red-900 dark:text-red-200 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${optStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-slate-200 flex items-center justify-center text-[11px] font-bold shrink-0">
                            {getArabicOptionLetter(optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isTheCorrectOne && (
                          <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
                            (الإجابة الصحيحة)
                          </span>
                        )}
                        {isTheChosenOne && !isTheCorrectOne && (
                          <span className="text-[11px] text-red-800 dark:text-red-300 font-bold shrink-0">
                            (إجابتك)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="mt-3 pt-3 border-t border-stone-200/60 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-300 bg-white/70 dark:bg-slate-850 p-2.5 rounded-xl">
                    <span className="font-bold text-[#006C35] dark:text-emerald-400">شرح وتوضيح الإجابة: </span>
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational SEO Article Section directly integrated at bottom */}
      <ArticleSection test={test} />
    </div>
  );
};
