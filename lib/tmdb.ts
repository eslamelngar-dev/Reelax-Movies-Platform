import {
  MovieResponse,
  MovieDetails,
  CreditsResponse,
  VideosResponse,
  Genre,
  ReviewsResponse,
} from "@/types/movie";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const LANG = "ar";

async function fetcher<T>(endpoint: string, params: string = ""): Promise<T> {
  try {
    if (!API_KEY || API_KEY === "your_tmdb_api_key_here") {
      throw new Error("TMDB_API_KEY not configured");
    }

    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${LANG}${params}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (e) {
    console.warn("TMDB API unavailable, using demo data:", (e as Error).message);
    return getMockResponse(endpoint) as T;
  }
}

export const tmdb = {
  getTrending: () => fetcher<MovieResponse>("/trending/movie/week"),

  getPopular: (page = 1) =>
    fetcher<MovieResponse>("/movie/popular", `&page=${page}`),

  getTopRated: (page = 1) =>
    fetcher<MovieResponse>("/movie/top_rated", `&page=${page}`),

  getNowPlaying: (page = 1) =>
    fetcher<MovieResponse>("/movie/now_playing", `&page=${page}`),

  getUpcoming: (page = 1) =>
    fetcher<MovieResponse>("/movie/upcoming", `&page=${page}`),

  getMovieDetails: (id: number) => fetcher<MovieDetails>(`/movie/${id}`),

  getMovieCredits: (id: number) =>
    fetcher<CreditsResponse>(`/movie/${id}/credits`),

  getMovieVideos: (id: number) =>
    fetcher<VideosResponse>(`/movie/${id}/videos`, "&language=en"),

  getSimilarMovies: (id: number) =>
    fetcher<MovieResponse>(`/movie/${id}/similar`),

  getRecommendations: (id: number) =>
    fetcher<MovieResponse>(`/movie/${id}/recommendations`),

  getMovieReviews: (id: number) =>
    fetcher<ReviewsResponse>(`/movie/${id}/reviews`, "&language=en"),

  searchMovies: (query: string, page = 1) =>
    fetcher<MovieResponse>(
      "/search/movie",
      `&query=${encodeURIComponent(query)}&page=${page}`,
    ),

  getGenres: () => fetcher<{ genres: Genre[] }>("/genre/movie/list"),

  getMoviesByGenre: (genreId: number, page = 1) =>
    fetcher<MovieResponse>(
      "/discover/movie",
      `&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
    ),

  getImageUrl: (path: string | null, size: string = "w500") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "/no-image.svg",
};

function getMockResponse(endpoint: string): unknown {
  const demoMovie = {
    id: 550,
    title: "نادي القتال",
    original_title: "Fight Club",
    overview: "هذا الفيلم هو تجربة سينمائية فريدة من نوعها.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/rQGBhS5EZ1Y3hFQ4Z2K3cL2pO1i.jpg",
    release_date: "1999-10-15",
    vote_average: 8.8,
    vote_count: 25000,
    genre_ids: [28, 53, 18],
    popularity: 150.5,
    adult: false,
    video: false,
    original_language: "en",
  };

  const demoMovies = Array.from({ length: 12 }, (_, i) => ({
    ...demoMovie,
    id: 550 + i,
    title: `فيلم تجريبي ${i + 1}`,
    vote_average: 7.5 + (i * 0.2),
    vote_count: 5000 + (i * 1000),
    release_date: `2024-0${i + 1}-15`,
  }));

  if (endpoint.includes("/trending/movie/week")) {
    return { page: 1, results: demoMovies.slice(0, 5), total_pages: 10, total_results: 50 };
  }
  if (endpoint.includes("/movie/popular")) {
    return { page: 1, results: demoMovies, total_pages: 5, total_results: 60 };
  }
  if (endpoint.includes("/movie/top_rated")) {
    return { page: 1, results: demoMovies.slice(0, 8), total_pages: 5, total_results: 40 };
  }
  if (endpoint.includes("/movie/now_playing")) {
    return { page: 1, results: demoMovies.slice(0, 6), total_pages: 5, total_results: 30 };
  }
  if (endpoint.includes("/movie/upcoming")) {
    return { page: 1, results: demoMovies.slice(0, 4), total_pages: 5, total_results: 20 };
  }
  if (endpoint.includes("/search/movie")) {
    return { page: 1, results: demoMovies.slice(0, 6), total_pages: 3, total_results: 18 };
  }
  if (endpoint.includes("/genre/movie/list")) {
    return {
      genres: [
        { id: 28, name: "أكشن" },
        { id: 35, name: "كوميدي" },
        { id: 18, name: "دراما" },
        { id: 878, name: "خيال علمي" },
        { id: 10749, name: "رومانسي" },
        { id: 53, name: "إثارة" },
      ],
    };
  }
  if (endpoint.includes("/discover/movie")) {
    return { page: 1, results: demoMovies, total_pages: 5, total_results: 60 };
  }
  if (endpoint.includes("/movie/") && endpoint.includes("/credits")) {
    return {
      id: 550,
      cast: [
        { id: 1, name: "ممثل تجريبي 1", character: "البطل", profile_path: "/demo.jpg", order: 1 },
        { id: 2, name: "ممثل تجريبي 2", character: "البطلة", profile_path: null, order: 2 },
      ],
      crew: [
        { id: 1, name: "مخرج تجريبي", job: "Director", department: "Directing", profile_path: null },
      ],
    };
  }
  if (endpoint.includes("/movie/") && endpoint.includes("/videos")) {
    return {
      id: 550,
      results: [
        { id: "dQw4w9WgXcQ", key: "dQw4w9WgXcQ", name: "إعلان الفيلم", site: "YouTube", type: "Trailer", official: true },
      ],
    };
  }
  if (endpoint.includes("/movie/") && endpoint.includes("/similar")) {
    return { page: 1, results: demoMovies.slice(0, 6), total_pages: 5, total_results: 30 };
  }
  if (endpoint.includes("/movie/") && endpoint.includes("/reviews")) {
    return {
      id: 550,
      results: [
        {
          id: "rev1",
          author: "مراجع تجريبي",
          author_details: { name: "مراجع", username: "reviewer", avatar_path: null, rating: 8 },
          content: "فيلم رائع وممتع جداً، أنصح بمشاهدته.",
          created_at: "2026-10-28",
        },
      ],
      total_pages: 1,
      total_results: 1,
    };
  }
  // Default movie details
  return {
    ...demoMovie,
    runtime: 139,
    budget: 63000000,
    revenue: 100853753,
    status: "Released",
    tagline: "أول قاعدة في نادي القتال: لا تتحدث عن نادي القتال.",
    homepage: "https://example.com",
    genres: [{ id: 28, name: "أكشن" }, { id: 53, name: "إثارة" }],
    production_companies: [{ id: 1, name: "شركة إنتاج تجريبية", logo_path: null, origin_country: "US" }],
    spoken_languages: [{ english_name: "English", iso_639_1: "en", name: "English" }],
  };
}
