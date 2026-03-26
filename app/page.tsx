import { tmdb } from "@/lib/tmdb";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { Flame, TrendingUp, Star, Clock, Sparkles } from "lucide-react";

export default async function HomePage() {
  const [trending, popular, topRated, nowPlaying, upcoming] =
    await Promise.all([
      tmdb.getTrending(),
      tmdb.getPopular(),
      tmdb.getTopRated(),
      tmdb.getNowPlaying(),
      tmdb.getUpcoming(),
    ]);

  return (
    <>
      <Hero movies={trending.results} />

      <div className="space-y-4 -mt-10 relative z-10">
        <MovieRow
          title="الأفلام الرائجة"
          movies={trending.results}
          icon={<Flame className="w-6 h-6 text-orange-500" />}
        />

        <MovieRow
          title="الأكثر شعبية"
          movies={popular.results}
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
        />

        <MovieRow
          title="الأعلى تقييماً"
          movies={topRated.results}
          icon={<Star className="w-6 h-6 text-yellow-500" />}
        />

        <MovieRow
          title="يعرض الآن"
          movies={nowPlaying.results}
          icon={<Sparkles className="w-6 h-6 text-green-500" />}
        />

        <MovieRow
          title="قريباً"
          movies={upcoming.results}
          icon={<Clock className="w-6 h-6 text-purple-500" />}
        />
      </div>
    </>
  );
}