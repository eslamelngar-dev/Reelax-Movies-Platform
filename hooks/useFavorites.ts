"use client";
import { useState, useEffect } from "react";
import { Movie } from "@/types/movie";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("reelax-favs");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (movie: Movie) => {
    const isFav = favorites.some((f) => f.id === movie.id);
    const newFavs = isFav
      ? favorites.filter((f) => f.id !== movie.id)
      : [...favorites, movie];

    setFavorites(newFavs);
    localStorage.setItem("reelax-favs", JSON.stringify(newFavs));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite: (id: number) => favorites.some((f) => f.id === id),
  };
}
