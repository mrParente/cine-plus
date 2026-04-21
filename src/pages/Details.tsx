import { useParams, Link } from "react-router-dom";
import { Play, ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContentCarousel from "@/components/ContentCarousel";
import FakePlayer from "@/components/FakePlayer";
import { useMovieDetails, useRecommendations } from "@/hooks/useTMDB";

const Details = () => {
  const { id, mediaType } = useParams<{ id: string; mediaType: string }>();
  const mt = (mediaType === "tv" ? "tv" : "movie") as "movie" | "tv";
  const { data: movie, isLoading } = useMovieDetails(Number(id), mt);
  const { data: recommended = [] } = useRecommendations(Number(id), mt);
  const [showPlayer, setShowPlayer] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-foreground">Conteúdo não encontrado</p>
          <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero backdrop */}
      <div className="relative w-full h-[70vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>

      {/* Details content */}
      <div className="relative -mt-64 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-56 md:w-64 rounded-xl shadow-2xl shadow-background/50"
            />
          </div>

          <div className="flex-1 space-y-5 pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Voltar
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star size={16} className="text-primary" fill="currentColor" />
                {movie.rating}/10
              </span>
              {movie.year > 0 && (
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {movie.year}
                </span>
              )}
              {movie.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {movie.duration}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {movie.overview}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowPlayer(true)}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              >
                <Play size={18} fill="currentColor" />
                Assistir Agora
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {recommended.length > 0 && (
        <div className="mt-16">
          <ContentCarousel title="Você também pode gostar" movies={recommended} />
        </div>
      )}

      {showPlayer && movie && (
        <FakePlayer movie={movie} onClose={() => setShowPlayer(false)} />
      )}

      <Footer />
    </div>
  );
};

export default Details;
