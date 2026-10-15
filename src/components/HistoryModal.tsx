import React from 'react';
import { QuizResultData } from '../types';
import { toEasternNumerals, formatTimeEastern } from '../utils/numerals';
import { X, Award, Clock, Calendar, Trophy, Eye } from 'lucide-react';

interface HistoryModalProps {
  attempts: QuizResultData[];
  onClose: () => void;
  onViewCertificate: (result: QuizResultData) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  attempts,
  onClose,
  onViewCertificate,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border-2 border-stone-200 dark:border-slate-800 transition-colors">
        <div className="bg-[#006C35] dark:bg-emerald-950 text-white px-6 py-4 rounded-t-3xl flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-bold">سجل إنجازاتي واختباراتي</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-emerald-800 dark:hover:bg-emerald-900 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {attempts.length === 0 ? (
            <div className="text-center py-12 text-stone-500 dark:text-slate-400">
              <Award className="w-12 h-12 text-stone-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="font-bold">لم تقم بحل أي اختبار بعد</p>
              <p className="text-xs text-stone-400 dark:text-slate-500 mt-1">
                اختر صفك الدراسي وابدأ بحل أحد الاختبارات لتسجيل إنجازاتك وشهاداتك هنا!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {attempts.map((att, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-slate-800 bg-stone-50/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#006C35] dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {att.gradeName}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-slate-400">
                        {att.periodName}
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-900 dark:text-white text-sm">
                      {att.testTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-slate-400 mt-1">
                      <span>طالب: {att.studentName || 'غير مسجل'}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{att.date}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeEastern(att.timeTakenSeconds)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200 dark:border-slate-700">
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-extrabold text-[#006C35] dark:text-emerald-400">
                        {toEasternNumerals(att.score)} / {toEasternNumerals(att.totalMarks)}
                      </span>
                      <span className="text-xs font-bold text-stone-500 dark:text-slate-400 block">
                        ({toEasternNumerals(att.percentage)}٪)
                      </span>
                    </div>

                    {att.percentage >= 60 && (
                      <button
                        onClick={() => onViewCertificate(att)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#c59b27] text-stone-900 text-xs font-bold transition-all shadow-xs cursor-pointer"
                        title="معاينة الشهادة"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>الشهادة</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
