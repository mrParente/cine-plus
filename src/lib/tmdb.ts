// TMDB API integration
const API_KEY = "2c125e79d04fdd451d1bbba481e9771e";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzEyNWU3OWQwNGZkZDQ1MWQxYmJiYTQ4MWU5NzcxZSIsIm5iZiI6MTc3NTc4MDY2My4yMDQsInN1YiI6IjY5ZDg0MzM3ZjE3M2JiNGVlMzdmMjM1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h4jfBW2bAsDax_6EhpTqE872rAvfxHqCpCaaSIneiUg";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const IMAGE_SIZES = {
  poster: `${IMG_BASE}/w500`,
  backdrop: `${IMG_BASE}/original`,
  posterSmall: `${IMG_BASE}/w342`,
} as const;

export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  media_type?: string;
}

export interface TMDBMovieDetail {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  number_of_seasons?: number;
  genres: { id: number; name: string }[];
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: number;
  duration: string;
  genres: string[];
  type: "movie" | "series" | "documentary";
  mediaType: "movie" | "tv";
}

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("language", "pt-BR");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

// Genre map for PT-BR
const GENRE_MAP: Record<number, string> = {
  28: "Ação", 12: "Aventura", 16: "Animação", 35: "Comédia", 80: "Crime",
  99: "Documentário", 18: "Drama", 10751: "Família", 14: "Fantasia",
  36: "História", 27: "Terror", 10402: "Música", 9648: "Mistério",
  10749: "Romance", 878: "Ficção Científica", 10770: "Cinema TV",
  53: "Thriller", 10752: "Guerra", 37: "Faroeste",
  10759: "Ação & Aventura", 10762: "Kids", 10763: "Notícias",
  10764: "Reality", 10765: "Sci-Fi & Fantasia", 10766: "Novela",
  10767: "Talk", 10768: "Guerra & Política",
};

function mapToMovie(item: TMDBMovie, type: "movie" | "series" | "documentary" = "movie"): Movie {
  const isTV = !!item.name;
  const date = item.release_date || item.first_air_date || "";
  return {
    id: item.id,
    title: item.title || item.name || "Sem título",
    overview: item.overview || "Sem descrição disponível.",
    poster: item.poster_path ? `${IMAGE_SIZES.poster}${item.poster_path}` : "/placeholder.svg",
    backdrop: item.backdrop_path ? `${IMAGE_SIZES.backdrop}${item.backdrop_path}` : "/placeholder.svg",
    rating: Math.round(item.vote_average * 10) / 10,
    year: date ? new Date(date).getFullYear() : 0,
    duration: isTV ? "Série" : "Filme",
    genres: item.genre_ids?.map((id) => GENRE_MAP[id] || "Outro").filter(Boolean) || [],
    type,
    mediaType: isTV ? "tv" : "movie",
  };
}

function mapDetailToMovie(item: TMDBMovieDetail, mediaType: "movie" | "tv"): Movie {
  const isTV = mediaType === "tv";
  const date = item.release_date || item.first_air_date || "";
  const runtime = item.runtime
    ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}min`
    : item.number_of_seasons
    ? `${item.number_of_seasons} temporada${item.number_of_seasons > 1 ? "s" : ""}`
    : "";

  return {
    id: item.id,
    title: item.title || item.name || "Sem título",
    overview: item.overview || "Sem descrição disponível.",
    poster: item.poster_path ? `${IMAGE_SIZES.poster}${item.poster_path}` : "/placeholder.svg",
    backdrop: item.backdrop_path ? `${IMAGE_SIZES.backdrop}${item.backdrop_path}` : "/placeholder.svg",
    rating: Math.round(item.vote_average * 10) / 10,
    year: date ? new Date(date).getFullYear() : 0,
    duration: runtime,
    genres: item.genres?.map((g) => g.name) || [],
    type: isTV ? "series" : "movie",
    mediaType,
  };
}

// ── Public API ──

export async function getTrending(): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/trending/movie/day");
  return data.results.slice(0, 12).map((m) => {
    const type = m.media_type === "tv" ? "series" : "movie";
    return mapToMovie(m, type);
  });
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/movie/popular");
  return data.results.slice(0, 12).map((m) => mapToMovie(m, "movie"));
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/movie/top_rated");
  return data.results.slice(0, 12).map((m) => mapToMovie(m, "movie"));
}

export async function getPopularSeries(): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/tv/popular");
  return data.results.slice(0, 12).map((m) => mapToMovie(m, "series"));
}

export async function getDocumentaries(): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/discover/movie", { with_genres: "99" });
  return data.results.slice(0, 12).map((m) => mapToMovie(m, "documentary"));
}

export async function getNowPlaying(): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/movie/now_playing");
  return data.results.slice(0, 12).map((m) => mapToMovie(m, "movie"));
}

export async function getMovieDetails(id: number, mediaType: "movie" | "tv"): Promise<Movie> {
  const data = await fetchTMDB<TMDBMovieDetail>(`/${mediaType}/${id}`);
  return mapDetailToMovie(data, mediaType);
}

export async function getRecommendations(id: number, mediaType: "movie" | "tv"): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>(`/${mediaType}/${id}/recommendations`);
  const type = mediaType === "tv" ? "series" : "movie";
  return data.results.slice(0, 12).map((m) => mapToMovie(m, type));
}

export async function searchContent(query: string): Promise<Movie[]> {
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/search/multi", { query });
  return data.results
    .filter((m) => m.media_type === "movie" || m.media_type === "tv")
    .slice(0, 20)
    .map((m) => {
      const type = m.media_type === "tv" ? "series" : "movie";
      return mapToMovie(m, type);
    });
}

export async function discoverByType(type: "movie" | "series" | "documentary"): Promise<Movie[]> {
  if (type === "documentary") return getDocumentaries();
  if (type === "series") {
    const data = await fetchTMDB<{ results: TMDBMovie[] }>("/discover/tv", { sort_by: "popularity.desc" });
    return data.results.slice(0, 20).map((m) => mapToMovie(m, "series"));
  }
  const data = await fetchTMDB<{ results: TMDBMovie[] }>("/discover/movie", { sort_by: "popularity.desc" });
  return data.results.slice(0, 20).map((m) => mapToMovie(m, "movie"));
}
