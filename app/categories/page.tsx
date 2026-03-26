import { tmdb } from "@/lib/tmdb";
import Link from "next/link";
import {
  Swords,
  Laugh,
  Ghost,
  Heart,
  Rocket,
  Drama,
  Search,
  Music,
  Skull,
  Baby,
  Compass,
  Clapperboard,
} from "lucide-react";

const genreIcons: Record<number, React.ReactNode> = {
  28: <Swords className="w-8 h-8" />,
  35: <Laugh className="w-8 h-8" />,
  27: <Ghost className="w-8 h-8" />,
  10749: <Heart className="w-8 h-8" />,
  878: <Rocket className="w-8 h-8" />,
  18: <Drama className="w-8 h-8" />,
  53: <Search className="w-8 h-8" />,
  10402: <Music className="w-8 h-8" />,
  80: <Skull className="w-8 h-8" />,
  16: <Baby className="w-8 h-8" />,
  12: <Compass className="w-8 h-8" />,
};

const genreColors: Record<number, string> = {
  28: "from-red-500/20 to-orange-500/20 border-red-500/30 hover:border-red-500",
  35: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 hover:border-yellow-500",
  27: "from-purple-500/20 to-violet-500/20 border-purple-500/30 hover:border-purple-500",
  10749:
    "from-pink-500/20 to-rose-500/20 border-pink-500/30 hover:border-pink-500",
  878: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500",
  18: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 hover:border-emerald-500",
  53: "from-gray-500/20 to-slate-500/20 border-gray-500/30 hover:border-gray-500",
  10402:
    "from-indigo-500/20 to-blue-500/20 border-indigo-500/30 hover:border-indigo-500",
  80: "from-red-900/20 to-gray-800/20 border-red-900/30 hover:border-red-900",
  16: "from-teal-500/20 to-cyan-500/20 border-teal-500/30 hover:border-teal-500",
  12: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 hover:border-amber-500",
};

export default async function CategoriesPage() {
  const { genres } = await tmdb.getGenres();

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Clapperboard className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl sm:text-4xl font-black">التصنيفات</h1>
        </div>
        <p className="text-gray-400">اختر التصنيف اللي يعجبك</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {genres.map((genre) => (
          <Link key={genre.id} href={`/category/${genre.id}`}>
            <div
              className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group ${
                genreColors[genre.id] ||
                "from-white/10 to-white/5 border-white/10 hover:border-white/30"
              }`}
            >
              <div className="text-white/80 group-hover:text-white transition-colors mb-4">
                {genreIcons[genre.id] || <Clapperboard className="w-8 h-8" />}
              </div>
              <h3 className="text-lg font-bold">{genre.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
