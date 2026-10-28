import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl sm:text-4xl font-black">سياسة الخصوصية</h1>
        </div>
        <p className="text-gray-400">آخر تحديث: 28 أكتوبر 2026</p>
      </div>

      <div className="glass rounded-3xl p-8 space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-3 text-red-400">المعلومات التي نجمعها</h2>
          <p className="text-gray-300 leading-relaxed">نحن نجمع فقط البيانات الضرورية لتشغيل الموقع وتحسين تجربة المستخدم. لا نجمع أي معلومات شخصية حساسة دون موافقتك الصريحة.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-3 text-red-400">كيفية استخدام البيانات</h2>
          <p className="text-gray-300 leading-relaxed">نستخدم البيانات فقط لتحسين خدماتنا وتقديم تجربة أفضل لك. لا نشارك بياناتك مع أي طرف ثالث دون إذن منك.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-3 text-red-400">حقوقك</h2>
          <p className="text-gray-300 leading-relaxed">لديك الحق في الوصول إلى بياناتك أو تصحيحها أو حذفها في أي وقت. يمكنك التواصل معنا عبر صفحة التواصل.</p>
        </section>
      </div>
    </div>
  );
}
