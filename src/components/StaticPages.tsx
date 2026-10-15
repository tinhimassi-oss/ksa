import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Mail,
  Info,
  CheckCircle,
  Send,
  MapPin,
  Phone,
  Sparkles,
  Heart,
  BookOpen,
} from 'lucide-react';

export type StaticPageType = 'privacy-policy' | 'terms-of-use' | 'contact-us' | 'about-us';

interface StaticPagesProps {
  pageType: StaticPageType;
  onNavigateHome: () => void;
}

export const StaticPages: React.FC<StaticPagesProps> = ({ pageType, onNavigateHome }) => {
  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [topic, setTopic] = useState('استفسار عام');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* 1. صفحة سياسة الخصوصية */}
      {pageType === 'privacy-policy' && (
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center gap-3 pb-6 border-b border-stone-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#006C35] dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                سياسة الخصوصية
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5">
                إختبارات المدرسة السعودية · التزام تام بحماية بيانات الطلاب والمعلمين
              </p>
            </div>
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-slate-300 space-y-5">
            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">١. مقدمة وتعهد</h2>
              <p>
                نولي في منصة «إختبارات المدرسة السعودية» أقصى درجات الأهمية لسرية وخصوصية بيانات المستخدمين من أبنائنا وبناتنا الطلاب والمعلمين وأولياء الأمور. صُممت المنصة وفق أفضل المعايير التقنية وضوابط حماية البيانات المتبعة في المملكة العربية السعودية.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">٢. البيانات التي نجمعها</h2>
              <p>
                لا تتطلب المنصة إنشاء حسابات معقدة أو إدخال أي بيانات حساسة؛ بيانات حل الاختبارات وسجل الدرجات يتم حفظها محلياً على جهاز المستخدم (Local Storage) لتمكينه من استعراض درجاته وطباعة شهاداته الشخصية بكل أمان وسهولة.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">٣. شهادات التقدير</h2>
              <p>
                الاسم الذي يُدخله الطالب في شهادة التفوق بعد انتهاء الاختبار لا يُشارك مع أي طرف خارجي أو إعلاني، ويُستخدم حصرياً لإظهار الاسم على وثيقة الشهادة المعدة للطباعة والحفظ الفوري.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">٤. ملفات تعريف الارتباط والأمان</h2>
              <p>
                نحرص على تشفير جميع الاتصالات واستخدام بروتوكول التصفح الآمن (HTTPS) لضمان حماية تجربة الاستخدام من أي تداخل خارجي، كما نراعي عدم تضمين أي أكواد تتبع مسيئة لخصوصية الأطفال والطلاب.
              </p>
            </section>

            <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400">
              <span>آخر تحديث: شوال ١٤٤٧ هـ / ٢٠٢٦ م</span>
              <button
                onClick={onNavigateHome}
                className="font-bold text-[#006C35] dark:text-emerald-400 hover:underline"
              >
                العودة للرئيسية ←
              </button>
            </div>
          </div>
        </article>
      )}

      {/* 2. صفحة شروط الاستخدام */}
      {pageType === 'terms-of-use' && (
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center gap-3 pb-6 border-b border-stone-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-[#D4AF37] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                شروط الاستخدام
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5">
                القواعد والشروط المنظمة لاستخدام منصة إختبارات المدرسة السعودية
              </p>
            </div>
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-slate-300 space-y-5">
            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">١. الغرض التعليمي</h2>
              <p>
                تقدم منصة «إختبارات المدرسة السعودية» بنك اختبارات تدريبية فترية ونهائية مساعدة لطلاب وطالبات التعليم العام بالمملكة العربية السعودية، بهدف المراجعة والاستعداد للاختبارات المدرسية الرسمية وتعزيز التحصيل العلمي.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">٢. الملكية الفكرية والاستخدام العادل</h2>
              <p>
                كافة نماذج الأسئلة والشروحات والشهادات الرقمية المصممة داخل المنصة محمية بحقوق النشر، ويُسمح بالاستخدام الشخصي والتعليمي لطلاب المدارس والمعلمين وأولياء الأمور مجاناً دون مقابل، ويحظر إعادة بيع المحتوى أو استغلاله تجارياً دون إذن مسبق.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2">٣. دقة الأسئلة والتحديث المستمر</h2>
              <p>
                نعمل بالتنسيق مع معلمين ومعلمات أكفاء على مراجعة الأسئلة وتطابقها مع المناهج المعتمدة وفصول الدراسة، ويسعدنا دائماً استقبال ملاحظات المعلمين لتحسين الأسئلة وتنقيحها باستمرار.
              </p>
            </section>

            <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400">
              <span>يسري العمل بهذه الشروط اعتباراً من عام ١٤٤٧ هـ</span>
              <button
                onClick={onNavigateHome}
                className="font-bold text-[#006C35] dark:text-emerald-400 hover:underline"
              >
                العودة للرئيسية ←
              </button>
            </div>
          </div>
        </article>
      )}

      {/* 3. صفحة اتصل بنا */}
      {pageType === 'contact-us' && (
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center gap-3 pb-6 border-b border-stone-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#006C35] dark:text-emerald-300 flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                اتصل بنا
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5">
                يسعدنا تلقي استفساراتكم وملاحظاتكم واقتراحات المعلمين والطلاب
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-[#006C35] dark:text-emerald-400 mx-auto" />
                  <h3 className="font-bold text-stone-900 dark:text-white text-base">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
                    شكراً لتواصلك مع فريق منصة «إختبارات المدرسة السعودية». سنقوم بالرد عليك عبر بريدك الإلكتروني في أقرب وقت.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#006C35] dark:text-emerald-400 underline mt-2"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="اسمك الكريم..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:border-[#006C35] dark:focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="example@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:border-[#006C35] dark:focus:border-emerald-500 focus:outline-none text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                      موضوع الرسالة
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:border-[#006C35] dark:focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="استفسار عام">استفسار عام</option>
                      <option value="اقتراح اختبار جديد">اقتراح اختبار جديد</option>
                      <option value="ملاحظة على سؤال">ملاحظة على سؤال أو خطأ مطبعي</option>
                      <option value="مشاركة معلم">مشاركة كمعلم / معلمة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                      نص الرسالة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب رسالتك أو اقتراحك بالتفصيل هنا..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-stone-900 dark:text-white text-xs sm:text-sm focus:border-[#006C35] dark:focus:border-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#006C35] hover:bg-[#004D25] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال الرسالة</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct Information */}
            <div className="bg-stone-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-stone-200 dark:border-slate-700 space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white mb-2">
                  معلومات التواصل المباشر
                </h3>
                <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed mb-6">
                  فريق الدعم التربوي والتقني مستعد دائماً للرد على أسئلة الطلاب والمعلمين وأولياء الأمور لتوفير أفضل تجربة تعلم واختبار.
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#006C35] dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-stone-900 dark:text-white">المقر:</span>
                      <span>المملكة العربية السعودية · الرياض</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#006C35] dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-stone-900 dark:text-white">البريد الإلكتروني المباشر:</span>
                      <span dir="ltr" className="font-mono text-stone-600 dark:text-slate-400">support@saudischooltests.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#006C35] dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-stone-900 dark:text-white">أوقات العمل:</span>
                      <span>الأحد إلى الخميس · ٨:٠٠ ص - ٤:٠٠ م</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-100/60 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 text-[11px] text-[#006C35] dark:text-emerald-300 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>نرحب بمساهمات المعلمين والمعلمات في بنك الأسئلة المدرسية.</span>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* 4. صفحة من نحن */}
      {pageType === 'about-us' && (
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center gap-3 pb-6 border-b border-stone-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-[#006C35] dark:text-emerald-300 flex items-center justify-center">
              <Info className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
                من نحن
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 mt-0.5">
                عن منصة إختبارات المدرسة السعودية
              </p>
            </div>
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-slate-300 space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 text-emerald-900 dark:text-emerald-200 font-medium">
              «إختبارات المدرسة السعودية» هي منصة وطنية تفاعلية متخصصة في تقديم بنك اختبارات مدرسية مباشر لجميع صفوف التعليم العام بالمملكة العربية السعودية، بهدف تعزيز التفوق الأكاديمي وصقل مهارات الطلاب بأسلوب ذكي وممتع.
            </div>

            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#006C35] dark:text-emerald-400" />
                <span>رسالتنا</span>
              </h2>
              <p>
                تمكين كل طالب وطالبة في كافة مناطق ومدارس المملكة من الوصول إلى اختبارات تدريبية نموذجية تفاعلية تحاكي الاختبارات المدرسية الحقيقية للفصلين الأول والثاني، وتزودهم بالتقييم الفوري والتغذية الراجعة والشرح المبسط لكل سؤال.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <span>رؤيتنا وقيمنا</span>
              </h2>
              <p>
                المساهمة في تحقيق تطلعات رؤية السعودية ٢٠٣٠ في تطوير التعليم الرقمي، من خلال توفير أدوات حديثة تساند الطلاب والمعلمين وأولياء الأمور، وتحفز الطلاب عبر شهادات التكريم الرقمية الفورية، مع التزام تام بالأمانة العلمية والدقة التربوية.
              </p>
            </section>

            <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>صُنعت بفخر لأجل طلاب</span>
                <span className="font-bold text-[#006C35] dark:text-emerald-400">المملكة العربية السعودية</span>
              </div>
              <button
                onClick={onNavigateHome}
                className="font-bold text-[#006C35] dark:text-emerald-400 hover:underline"
              >
                العودة للرئيسية ←
              </button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
