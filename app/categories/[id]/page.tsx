import { tmdb } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clapperboard } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { genres } = await tmdb.getGenres();
  const genre = genres.find((g) => g.id === Number(id));
  return {
    title: `${genre?.name || "تصنيف"} | Reelax`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;
  const genreId = Number(id);
  const currentPage = Number(page) || 1;

  const [data, { genres }] = await Promise.all([
    tmdb.getMoviesByGenre(genreId, currentPage),
    tmdb.getGenres(),
  ]);

  const genre = genres.find((g) => g.id === genreId);

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Clapperboard className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl sm:text-4xl font-black">
            {genre?.name || "تصنيف"}
          </h1>
        </div>
        <p className="text-gray-400">
          {data.total_results.toLocaleString()} فيلم
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mb-12">
        {data.results.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        {currentPage > 1 && (
          <Link
            href={`/category/${genreId}?page=${currentPage - 1}`}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            السابق
          </Link>
        )}

        <span className="px-4 py-3 bg-red-600 rounded-xl font-bold text-sm">
          {currentPage} / {Math.min(data.total_pages, 500)}
        </span>

        {currentPage < data.total_pages && currentPage < 500 && (
          <Link
            href={`/category/${genreId}?page=${currentPage + 1}`}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
          >
            التالي
            <ChevronLeft className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}