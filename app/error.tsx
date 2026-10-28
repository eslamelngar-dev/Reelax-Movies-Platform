"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw, Film } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="pt-28 pb-20 max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
        <Film className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-black mb-3">
        حدث خطأ ما
      </h1>
      <p className="text-gray-400 leading-relaxed mb-8">
        تعذّر تحميل المحتوى المطلوب. قد تكون هناك مشكلة مؤقتة في الاتصال بخدمة
        الأفلام — حاول مرة أخرى.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة المحاولة
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-colors"
        >
          <Home className="w-4 h-4" />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
