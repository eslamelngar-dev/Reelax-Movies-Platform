import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl sm:text-4xl font-black">شروط الاستخدام</h1>
        </div>
        <p className="text-gray-400">آخر تحديث: 28 أكتوبر 2026</p>
      </div>

      <div className="glass rounded-3xl p-8 space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3 text-red-400">الاستخدام المسموح به</h2>
          <p className="text-gray-300 leading-relaxed">يُسمح باستخدام الموقع لأغراض شخصية وترفيهية فقط. لا يجوز استخدام الموقع لأغراض تجارية أو غير قانونية.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-3 text-red-400">المحتوى</h2>
          <p className="text-gray-300 leading-relaxed">جميع البيانات المقدمة من TMDB. نحن لا نضمن دقة أو اكتمال المعلومات المقدمة من الخدمات الخارجية.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-3 text-red-400">المسؤولية</h2>
          <p className="text-gray-300 leading-relaxed">نحن نبذل قصارى جهدنا للحفاظ على تشغيل الموقع بسلاسة، لكننا لا نتحمل مسؤولية أي انقطاع مؤقت في الخدمة.</p>
        </section>
      </div>
    </div>
  );
}
