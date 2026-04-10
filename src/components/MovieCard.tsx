import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { Movie } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/detalhes/${movie.mediaType}/${movie.id}`}
        className="group block relative w-[160px] sm:w-[180px] md:w-[200px] shrink-0"
      >
        {/* Poster */}
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Play size={20} fill="currentColor" className="text-primary-foreground ml-0.5" />
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-xs font-semibold text-foreground px-2 py-0.5 rounded">
            ⭐ {movie.rating}
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-2 text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">{movie.year}</p>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
