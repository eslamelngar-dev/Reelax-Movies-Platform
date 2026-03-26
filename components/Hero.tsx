"use client";

import { Movie } from "@/types/movie";
import { tmdb } from "@/lib/tmdb";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Calendar, Info } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface HeroProps {
  movies: Movie[];
}

export default function Hero({ movies }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const topMovies = movies.slice(0, 5);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % topMovies.length);
  }, [topMovies.length]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const movie = topMovies[current];
  if (!movie) return null;

  return (
    <div className="relative h-[85vh] sm:h-[90vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${tmdb.getImageUrl(
                movie.backdrop_path,
                "original",
              )})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-end pb-20 sm:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-red-400 text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-red-400" />
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-gray-300 text-xs font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {movie.release_date?.split("-")[0]}
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              {movie.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 line-clamp-3">
              {movie.overview || "لا يوجد وصف متاح لهذا الفيلم"}
            </p>

            <Link href={`/movie/${movie.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-sm sm:text-base transition-colors shadow-lg shadow-red-600/30"
              >
                <Info className="w-5 h-5" />
                تفاصيل الفيلم
              </motion.button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {topMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-red-500"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
