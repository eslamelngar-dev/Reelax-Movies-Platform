import { tmdb } from "@/lib/tmdb";
import Image from "next/image";
import { Star, Clock, Calendar, Globe, DollarSign, Film } from "lucide-react";
import MovieRow from "@/components/MovieRow";
import CastSlider from "@/components/CastSlider";
import MovieDetailsClient from "./MovieDetailsClient";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = await tmdb.getMovieDetails(Number(id));
  return {
    title: `${movie.title} | Reelax`,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movieId = Number(id);

  const [movie, credits, videos, similar, reviews] = await Promise.all([
    tmdb.getMovieDetails(movieId),
    tmdb.getMovieCredits(movieId),
    tmdb.getMovieVideos(movieId),
    tmdb.getSimilarMovies(movieId),
    tmdb.getMovieReviews(movieId),
  ]);

  const trailer = videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  const director = credits.crew.find((c) => c.job === "Director");

  const formatMoney = (amount: number) => {
    if (!amount) return "غير متاح";
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  };

  return (
    <div>
      <div className="relative min-h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${tmdb.getImageUrl(
              movie.backdrop_path,
              "original",
            )})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-64 sm:w-72 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50">
                <Image
                  src={tmdb.getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
              {movie.tagline && (
                <p className="text-red-400 text-sm font-medium mb-2 italic">
                  &quot;{movie.tagline}&quot;
                </p>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 leading-tight">
                {movie.title}
              </h1>

              {movie.original_title !== movie.title && (
                <p className="text-gray-400 text-lg mb-4">
                  {movie.original_title}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-yellow-400 font-bold text-sm">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-500 text-xs">
                    ({movie.vote_count.toLocaleString()})
                  </span>
                </div>

                {movie.runtime > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300">
                    <Clock className="w-4 h-4" />
                    {Math.floor(movie.runtime / 60)}س {movie.runtime % 60}د
                  </div>
                )}

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300">
                  <Calendar className="w-4 h-4" />
                  {movie.release_date}
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300">
                  <Globe className="w-4 h-4" />
                  {movie.original_language.toUpperCase()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 max-w-3xl">
                {movie.overview || "لا يوجد وصف متاح لهذا الفيلم"}
              </p>

              <MovieDetailsClient trailerKey={trailer?.key || null} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {director && (
                  <div className="glass rounded-xl p-3">
                    <p className="text-gray-500 text-xs mb-1">المخرج</p>
                    <p className="text-white font-bold text-sm">
                      {director.name}
                    </p>
                  </div>
                )}
                <div className="glass rounded-xl p-3">
                  <p className="text-gray-500 text-xs mb-1">الحالة</p>
                  <p className="text-white font-bold text-sm">{movie.status}</p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> الميزانية
                  </p>
                  <p className="text-white font-bold text-sm">
                    {formatMoney(movie.budget)}
                  </p>
                </div>
                <div className="glass rounded-xl p-3">
                  <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> الإيرادات
                  </p>
                  <p className="text-green-400 font-bold text-sm">
                    {formatMoney(movie.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {credits.cast.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Film className="w-6 h-6 text-red-500" />
              طاقم العمل
            </h2>
            <CastSlider cast={credits.cast} />
          </section>
        )}

        {reviews.results.length > 0 && (
          <section className="py-10">
            <h2 className="text-2xl font-black mb-6">المراجعات</h2>
            <div className="space-y-4">
              {reviews.results.slice(0, 5).map((review) => (
                <div key={review.id} className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 font-bold text-sm">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{review.author}</p>
                      {review.author_details.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-yellow-400">
                            {review.author_details.rating}/10
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p
                    className="text-gray-300 text-sm leading-relaxed line-clamp-4"
                    dir="auto"
                  >
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {similar.results.length > 0 && (
        <MovieRow title="أفلام مشابهة" movies={similar.results} />
      )}
    </div>
  );
}
