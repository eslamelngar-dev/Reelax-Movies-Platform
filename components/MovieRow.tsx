"use client";

import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  icon?: React.ReactNode;
  href?: string;
}

export default function MovieRow({ title, movies, icon, href }: MovieRowProps) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-xl sm:text-2xl font-black">{title}</h2>
            <div className="h-1 w-12 bg-gradient-to-l from-red-500 to-orange-500 rounded-full" />
          </div>
          {href && (
            <Link
              href={href}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors group"
            >
              عرض الكل
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {movies.slice(0, 12).map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
