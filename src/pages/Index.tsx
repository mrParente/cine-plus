import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ContentCarousel from "@/components/ContentCarousel";
import Footer from "@/components/Footer";
import { useTrending, usePopularMovies, useNowPlaying, usePopularSeries, useDocumentaries, useSearch } from "@/hooks/useTMDB";
import type { Movie } from "@/lib/tmdb";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: trending = [], isLoading: loadingTrending } = useTrending();
  const { data: popular = [] } = usePopularMovies();
  const { data: nowPlaying = [] } = useNowPlaying();
  const { data: series = [] } = usePopularSeries();
  const { data: docs = [] } = useDocumentaries();
  const { data: searchResults } = useSearch(searchQuery);

  const heroMovie = trending[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={setSearchQuery} />

      {searchQuery.length >= 2 && searchResults ? (
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Resultados para "{searchQuery}"
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((movie) => (
              <div key={movie.id}>
                <a href={`/detalhes/${movie.mediaType}/${movie.id}`} className="group block">
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-sm text-foreground line-clamp-1">{movie.title}</p>
                </a>
              </div>
            ))}
            {searchResults.length === 0 && (
              <p className="col-span-full text-muted-foreground">Nenhum resultado encontrado.</p>
            )}
          </div>
        </div>
      ) : (
        <>
          {heroMovie && <HeroBanner movie={heroMovie} />}
          <div className={heroMovie ? "-mt-20 relative z-10" : "pt-20"}>
            <ContentCarousel title="Em Alta" movies={trending} />
            <ContentCarousel title="Lançamentos" movies={nowPlaying} />
            <ContentCarousel title="Filmes Populares" movies={popular} />
            <ContentCarousel title="Séries Populares" movies={series} />
            <ContentCarousel title="Documentários" movies={docs} />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
