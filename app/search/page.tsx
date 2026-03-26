import { tmdb } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { Search as SearchIcon } from "lucide-react";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const data = await tmdb.searchMovies(query, page);

  if (data.results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🎬</p>
        <p className="text-xl text-gray-400">
          لا توجد نتائج لـ &quot;{query}&quot;
        </p>
        <p className="text-gray-600 mt-2">جرب البحث بكلمات مختلفة</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-400 mb-6">
        تم العثور على {data.total_results.toLocaleString()} نتيجة لـ &quot;
        {query}&quot;
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {data.results.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>
    </>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const query = q || "";
  const currentPage = Number(page) || 1;

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <SearchIcon className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl sm:text-4xl font-black">البحث</h1>
        </div>
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>

      {query ? (
        <SearchResults query={query} page={currentPage} />
      ) : (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-xl text-gray-400">ابحث عن أفلامك المفضلة</p>
        </div>
      )}
    </div>
  );
}
