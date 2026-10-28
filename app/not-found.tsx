import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-28 pb-20 max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <p className="text-7xl sm:text-8xl font-black text-gradient mb-4">404</p>
      <h1 className="text-2xl sm:text-3xl font-black mb-3">
        الصفحة غير موجودة
      </h1>
      <p className="text-gray-400 leading-relaxed mb-8">
        يبدو أن الرابط الذي تتبعه غير صحيح أو أن المحتوى لم يعد متاحاً.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          العودة للرئيسية
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-colors"
        >
          <Search className="w-4 h-4" />
          البحث عن فيلم
        </Link>
      </div>
    </div>
  );
}
