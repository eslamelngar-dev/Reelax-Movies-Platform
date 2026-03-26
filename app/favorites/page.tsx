"use client";
import { useFavorites } from "@/hooks/useFavorites";
import MovieCard from "@/components/MovieCard";
import { HeartOff } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
        <span className="text-gradient">قائمتي</span> المفضلة
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <HeartOff className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">قائمة مفضلاتك فارغة حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}