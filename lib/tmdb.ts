import {
  MovieResponse,
  MovieDetails,
  CreditsResponse,
  VideosResponse,
  Genre,
  ReviewsResponse,
} from "@/types/movie";


const LANG = "ar";

async function fetcher<T>(endpoint: string, params: string = ""): Promise<T> {
  const res = await fetch(
    `${process.env.BASE_URL}${endpoint}?api_key=${process.env.API_KEY}&language=${LANG}${params}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
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
