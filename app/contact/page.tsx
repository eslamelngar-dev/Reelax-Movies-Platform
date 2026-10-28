"use client";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl sm:text-4xl font-black">تواصل معنا</h1>
        </div>
        <p className="text-gray-400">نحن هنا لمساعدتك في أي استفسار أو اقتراح</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl font-black mb-6">معلومات التواصل</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="font-bold">contact@reelax.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">الهاتف</p>
                <p className="font-bold">+20 123 456 7890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">الموقع</p>
                <p className="font-bold">القاهرة، مصر</p>
              </div>
            </div>
          </div>
        </div>

        <form className="glass rounded-3xl p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("تم إرسال رسالتك بنجاح!"); }}>
          <h2 className="text-xl font-black mb-2">أرسل رسالة</h2>
          <p className="text-gray-400 text-sm mb-4">سنرد عليك في أقرب وقت ممكن</p>
          <input type="text" placeholder="الاسم الكامل" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors" required />
          <input type="email" placeholder="البريد الإلكتروني" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors" required />
          <textarea placeholder="رسالتك..." rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors resize-none" required />
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors">
            <Send className="w-5 h-5" />
            إرسال الرسالة
          </button>
        </form>
      </div>
    </div>
  );
}
