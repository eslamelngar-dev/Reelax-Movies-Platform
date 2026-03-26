"use client";

import { Movie } from "@/types/movie";
import { tmdb } from "@/lib/tmdb";
import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/movie/${movie.id}`} className="group block">
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/5">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(movie);
            }}
            className="absolute top-2 left-2 p-2 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 z-10 hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite(movie.id) ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </button>
          <Image
            src={tmdb.getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg border border-white/10">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
              <Calendar className="w-3 h-3" />
              {movie.release_date?.split("-")[0]}
            </div>
            <p className="text-xs text-gray-300 line-clamp-2">
              {movie.overview || "لا يوجد وصف"}
            </p>
          </div>
        </div>

        <div className="mt-3 px-1">
          <h3 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-relaxed">
            {movie.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
