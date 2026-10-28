"use client";

import { useCallback, useSyncExternalStore } from "react";

const PREFIX = "reelax-rating-";
const cache = new Map<number, number>();
const listeners = new Set<() => void>();

function readRating(movieId: number): number {
  const cached = cache.get(movieId);
  if (cached !== undefined) return cached;

  let rating = 0;
  try {
    const stored = localStorage.getItem(`${PREFIX}${movieId}`);
    if (stored) rating = Number(stored) || 0;
  } catch {
    // التخزين غير متاح
  }

  cache.set(movieId, rating);
  return rating;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key?.startsWith(PREFIX)) {
      cache.clear();
      listener();
    }
  };

  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useMovieRating(movieId: number) {
  const rating = useSyncExternalStore(
    subscribe,
    () => readRating(movieId),
    () => 0,
  );

  const setRating = useCallback(
    (value: number) => {
      cache.set(movieId, value);
      try {
        localStorage.setItem(`${PREFIX}${movieId}`, String(value));
      } catch {
        // التخزين غير متاح
      }
      listeners.forEach((listener) => listener());
    },
    [movieId],
  );

  return { rating, setRating };
}
