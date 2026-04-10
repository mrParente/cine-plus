import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { useDiscover } from "@/hooks/useTMDB";
import type { Movie } from "@/lib/tmdb";

const categoryMap: Record<string, { title: string; type: Movie["type"] }> = {
  filmes: { title: "Filmes", type: "movie" },
  series: { title: "Séries", type: "series" },
  documentarios: { title: "Documentários", type: "documentary" },
};

const Category = () => {
  const { category } = useParams();
  const config = categoryMap[category || ""];
  const type = config?.type || "movie";
  const title = config?.title || "Todos";

  const { data: items = [], isLoading } = useDiscover(type);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">{title}</h1>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {items.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        )}
        {!isLoading && items.length === 0 && (
          <p className="text-muted-foreground text-center py-20">Nenhum conteúdo encontrado.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Category;
