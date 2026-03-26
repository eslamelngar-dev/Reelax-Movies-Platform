import { Film, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Film className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-black">
                <span className="text-gradient">Reel</span>
                <span className="text-white">ax</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              استرخي واتفرج! موقع Reelax هو وجهتك الأولى لاكتشاف وتقييم الأفلام.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">روابط سريعة</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                الرئيسية
              </Link>
              <Link
                href="/categories"
                className="block text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                التصنيفات
              </Link>
              <Link
                href="/search"
                className="block text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                البحث
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">التصنيفات</h3>
            <div className="space-y-2">
              <Link
                href="/category/28"
                className="block text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                أكشن
              </Link>
              <Link
                href="/category/35"
                className="block text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                كوميدي
              </Link>
              <Link
                href="/category/27"
                className="block text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                رعب
              </Link>
              <Link
                href="/category/10749"
                className="block text-gray-400 hover:text-red-400 text-sm transition-colors"
              >
                رومانسي
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            صنع بـ <Heart className="w-4 h-4 fill-red-500 text-red-500" />{" "}
            Reelax © {new Date().getFullYear()}
          </p>
          <p className="text-gray-600 text-xs">البيانات مقدمة من TMDb</p>
        </div>
      </div>
    </footer>
  );
}
