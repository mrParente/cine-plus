import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Movie } from "@/lib/tmdb";

interface HeroBannerProps {
  movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      {/* Backdrop image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl space-y-5"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
            {movie.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-semibold">
              ⭐ {movie.rating}
            </span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
            <span>{movie.genres.join(" • ")}</span>
          </div>

          <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex gap-3 pt-2">
            <Link
              to={`/detalhes/${movie.mediaType}/${movie.id}`}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              <Play size={18} fill="currentColor" />
              Assistir
            </Link>
            <Link
              to={`/detalhes/${movie.mediaType}/${movie.id}`}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Info size={18} />
              Mais Info
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
