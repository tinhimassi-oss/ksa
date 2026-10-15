import React, { useState } from 'react';
import { QuizResultData } from '../types';
import { toEasternNumerals } from '../utils/numerals';
import { testService } from '../services/testService';
import { X, Printer, Award, Sparkles, CheckCircle2, User } from 'lucide-react';

interface CertificateModalProps {
  result: QuizResultData;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  result,
  onClose,
}) => {
  const [studentName, setStudentName] = useState<string>(
    result.studentName || testService.getSavedStudentName() || 'طالب متميز'
  );

  const handlePrint = () => {
    window.print();
  };

  const handleNameChange = (val: string) => {
    setStudentName(val);
    result.studentName = val;
    testService.updateLastAttemptStudentName(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border-4 border-[#D4AF37] certificate-print-container">
        {/* Modal Controls (Hidden in print) */}
        <div className="no-print bg-stone-100 dark:bg-slate-900 px-4 sm:px-6 py-3 border-b border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-stone-700 dark:text-slate-200 font-bold text-sm">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span>شهادة تفوق وتقدير رقمية</span>
          </div>

          {/* Quick Name Edit in Modal */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 rounded-lg px-2 py-1">
              <User className="w-3.5 h-3.5 text-[#006C35] dark:text-emerald-400" />
              <input
                type="text"
                value={studentName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="تعديل اسم الطالب..."
                className="text-xs font-bold text-stone-800 dark:text-white focus:outline-none w-28 sm:w-36 bg-transparent"
              />
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006C35] hover:bg-[#004D25] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الشهادة</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-slate-800 text-stone-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Certificate Frame */}
        <div className="p-8 sm:p-12 text-center bg-radial from-stone-50 to-white relative">
          {/* Inner Ornate Border */}
          <div className="border-4 border-double border-[#006C35] rounded-2xl p-6 sm:p-10 relative">
            {/* Corner Gold Ornaments */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#D4AF37] rounded-sm transform rotate-45" />
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#D4AF37] rounded-sm transform rotate-45" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#D4AF37] rounded-sm transform rotate-45" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-[#D4AF37] rounded-sm transform rotate-45" />

            {/* Header / National Emblem */}
            <div className="mb-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border-2 border-[#D4AF37] flex items-center justify-center text-[#006C35] mb-2 shadow-xs">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-[#006C35]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 2v20M12 6c-3 0-5-2-5-4 0 3 2 5 5 5zm0 0c3 0 5-2 5-4 0 3-2 5-5 5z" />
                  <path d="M7 11c-2 0-3-1-3-3 0 2 1 3 3 3zm10 0c2 0 3-1 3-3 0 2-1 3-3 3z" />
                  <path d="M6 18l12-8M18 18L6 10" />
                </svg>
              </div>
              <p className="text-xs font-bold text-stone-500">المملكة العربية السعودية</p>
              <p className="text-xs font-bold text-[#006C35]">إختبارات المدرسة السعودية</p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#006C35] tracking-wide mb-4 font-serif">
              شهادة شكر وتفوق
            </h2>

            <p className="text-sm sm:text-base text-stone-600 mb-4">
              تَسر منصة «إختبارات المدرسة السعودية» أن تمنح هذه الشهادة للطالب / الطالبة:
            </p>

            {/* Student Name */}
            <div className="my-4 py-2 border-b-2 border-stone-300 inline-block min-w-[280px]">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {studentName || 'طالب متميز'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed mt-2 mb-6">
              نظير تميزه واجتيازه بتفوق في <span className="font-bold text-stone-800">{result.testTitle}</span> لـ{' '}
              <span className="font-bold text-[#006C35]">{result.gradeName}</span>، {result.termName} بنسبة{' '}
              <span className="font-extrabold text-stone-900 bg-amber-100 px-2 py-0.5 rounded">
                {toEasternNumerals(result.percentage)}٪
              </span>{' '}
              وحصوله على درجة (
              <span className="font-bold text-[#006C35]">
                {toEasternNumerals(result.score)} من {toEasternNumerals(result.totalMarks)}
              </span>
              ).
            </p>

            {/* Signatures & Seal */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-2 gap-6 text-xs text-stone-600">
              <div className="text-right">
                <span className="block text-stone-400">تاريخ الإنجاز:</span>
                <span className="font-bold text-stone-800">{result.date}</span>
              </div>
              <div className="text-left flex flex-col items-end">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#D4AF37] flex items-center justify-center text-center p-1 text-[10px] font-bold text-[#006C35]">
                  <span>ختم الاعتماد الرقمي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
