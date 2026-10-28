import { Film, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Film className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl sm:text-4xl font-black">عن Reelax</h1>
        </div>
        <p className="text-gray-400">موقعك الأول لاكتشاف وتقييم الأفلام والمسلسلات</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="glass rounded-2xl p-6 text-center">
          <Sparkles className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">أفلام رائجة</h3>
          <p className="text-gray-400 text-sm">تصفح أحدث الأفلام الرائجة والمتداولة حالياً من مختلف التصنيفات.</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <Heart className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">قائمة المفضلة</h3>
          <p className="text-gray-400 text-sm">احفظ أفلامك المفضلة وشاهدها لاحقاً بكل سهولة.</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <Film className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">تقييم المستخدم</h3>
          <p className="text-gray-400 text-sm">قيّم الأفلام واحفظ تقييمك في التخزين المحلي لمتابعته لاحقاً.</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-black mb-4">استرخي واتفرج!</h2>
        <p className="text-gray-300 leading-relaxed">
          Reelax هو وجهتك الأولى لاكتشاف الأفلام والمسلسلات. نقدم لك تجربة سلسة وممتعة لاستكشاف المحتوى السينمائي من مختلف التصنيفات والأنواع. استمتع بمشاهدة الأفلام وتقييمها ومشاركتها مع أصدقائك.
        </p>
      </div>
    </div>
  );
}
