"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { Movie } from "@/types/movie";

const STORAGE_KEY = "reelax-favs";

// متجر خارجي بسيط فوق localStorage مع مستمعين لمشاركة الحالة عبر التطبيق
let cache: Movie[] | null = null;
const listeners = new Set<() => void>();

function readStored(): Movie[] {
  if (cache !== null) return cache;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      cache = Array.isArray(parsed) ? (parsed as Movie[]) : [];
    } else {
      cache = [];
    }
  } catch {
    // بيانات تالفة في التخزين — نبدأ بقائمة فارغة
    cache = [];
  }

  return cache;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // مزامنة التغييرات القادمة من تبويب آخر
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };

  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Movie[] {
  return readStored();
}

function getServerSnapshot(): Movie[] {
  return [];
}

interface FavoritesContextValue {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const favorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleFavorite = useCallback((movie: Movie) => {
    const current = readStored();
    const next = current.some((f) => f.id === movie.id)
      ? current.filter((f) => f.id !== movie.id)
      : [...current, movie];

    cache = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // التخزين ممتلئ أو غير متاح — تظل الحالة في الذاكرة
    }
    emitChange();
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
