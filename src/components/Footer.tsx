import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onSelectGrade?: (gradeId: number) => void;
  onNavigatePage: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  return (
    <footer className="bg-stone-900 dark:bg-slate-950 text-stone-300 pt-12 pb-8 border-t-4 border-[#006C35] mt-16 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-stone-800 dark:border-slate-800 text-sm">
          {/* Col 1: Platform Brand (إختبارات المدرسة السعودية) */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl sm:text-2xl font-extrabold text-white">
                إختبارات المدرسة السعودية
              </span>
              <span className="text-xs bg-[#D4AF37] text-stone-900 font-bold px-1.5 py-0.5 rounded">
                المملكة العربية السعودية
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              المنصة المدرسية التفاعلية المخصصة لطلاب وطالبات المملكة العربية السعودية لحل واستعراض الاختبارات المدرسية المباشرة لكافة المراحل (الابتدائية، المتوسطة، والثانوية) مع تقويم الفصلين الدراسيين والفترات ورصد فوري للدرجات وشهادات تفوق رقمية.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#D4AF37] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>طموحنا عنان السماء · نحو تميز تعليمي رقمي مستدام</span>
            </div>
          </div>

          {/* Col 2: The 4 Required Static Pages (صفحات المنصة والمعلومات) */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <span>صفحات المنصة والمعلومات</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onNavigatePage('/privacy-policy')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-right group"
                >
                  <span className="text-[#D4AF37]">•</span>
                  <span className="group-hover:underline">سياسة الخصوصية</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('/terms-of-use')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-right group"
                >
                  <span className="text-[#D4AF37]">•</span>
                  <span className="group-hover:underline">شروط الاستخدام</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('/contact-us')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-right group"
                >
                  <span className="text-[#D4AF37]">•</span>
                  <span className="group-hover:underline">اتصل بنا</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigatePage('/about-us')}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-right group"
                >
                  <span className="text-[#D4AF37]">•</span>
                  <span className="group-hover:underline">من نحن</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Ministry of Education Copyright & Independent Educational Platform Notice */}
        <div className="mt-8 mb-4 p-4 rounded-2xl bg-stone-800/90 border border-stone-700 text-center text-xs text-stone-300 shadow-inner">
          <p className="font-bold text-stone-200 leading-relaxed">
            هذه الاختبارات هي مواد تدريبية مستقلة تُقدمها منصة تعليمية لا ترتبط بوزارة التعليم في المملكة العربية السعودية بأي شكل من الأشكال؛ حيث تهدف فقط للمراجعة وتثبيت المعلومات، مع تأكيد أن جميع حقوق الملكية الفكرية للمناهج الدراسية محفوظة للوزارة.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <div className="flex items-center gap-1">
            <span>صُممت بكل</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>لخدمة أبنائنا وبناتنا الطلاب في كافة مدارس المملكة العربية السعودية</span>
          </div>
          <div>
            <span>جميع الحقوق محفوظة · إختبارات المدرسة السعودية © ٢٠٢٦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
