import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/tmdb";

interface ContentCarouselProps {
  title: string;
  movies: Movie[];
}

const ContentCarousel = ({ title, movies }: ContentCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 600;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (movies.length === 0) return null;

  return (
    <section className="relative py-6">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {title}
      </h2>

      <div className="relative group">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-background to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={28} className="text-foreground" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-background to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={28} className="text-foreground" />
        </button>

        {/* Cards row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentCarousel;
