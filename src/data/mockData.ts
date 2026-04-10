// Dados mock para o app Cine Plus
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
}

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export const movies: Movie[] = [
  {
    id: 1,
    title: "Duna: Parte Dois",
    overview: "Paul Atreides se une aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo.",
    poster: `${POSTER_BASE}/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg`,
    backdrop: `${BACKDROP_BASE}/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,
    rating: 8.3,
    year: 2024,
    duration: "2h 46min",
    genres: ["Ficção Científica", "Aventura"],
    type: "movie",
  },
  {
    id: 2,
    title: "Oppenheimer",
    overview: "A história do físico americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.",
    poster: `${POSTER_BASE}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    backdrop: `${BACKDROP_BASE}/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg`,
    rating: 8.5,
    year: 2023,
    duration: "3h 1min",
    genres: ["Drama", "História"],
    type: "movie",
  },
  {
    id: 3,
    title: "Pobres Criaturas",
    overview: "A incrível história de Bella Baxter, uma jovem trazida de volta à vida pelo cientista Dr. Godwin Baxter.",
    poster: `${POSTER_BASE}/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
    backdrop: `${BACKDROP_BASE}/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg`,
    rating: 8.0,
    year: 2023,
    duration: "2h 21min",
    genres: ["Ficção Científica", "Romance"],
    type: "movie",
  },
  {
    id: 4,
    title: "Killers of the Flower Moon",
    overview: "Na década de 1920, membros da nação Osage são assassinados sob circunstâncias misteriosas, desencadeando uma investigação do FBI.",
    poster: `${POSTER_BASE}/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg`,
    backdrop: `${BACKDROP_BASE}/1X7vow16X7CnCoexXh4H4F2yDJv.jpg`,
    rating: 7.7,
    year: 2023,
    duration: "3h 26min",
    genres: ["Crime", "Drama"],
    type: "movie",
  },
  {
    id: 5,
    title: "The Bear",
    overview: "Um jovem chef de cozinha retorna a Chicago para administrar o restaurante de sua família após uma tragédia.",
    poster: `${POSTER_BASE}/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg`,
    backdrop: `${BACKDROP_BASE}/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg`,
    rating: 8.7,
    year: 2023,
    duration: "8 episódios",
    genres: ["Drama", "Comédia"],
    type: "series",
  },
  {
    id: 6,
    title: "Succession",
    overview: "A família Roy, dona de um dos maiores conglomerados de mídia do mundo, luta pelo controle da empresa enquanto o patriarca se afasta.",
    poster: `${POSTER_BASE}/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg`,
    backdrop: `${BACKDROP_BASE}/wDAFneCqr0FMtMksFjEUGNqOJgP.jpg`,
    rating: 8.9,
    year: 2023,
    duration: "4 temporadas",
    genres: ["Drama"],
    type: "series",
  },
  {
    id: 7,
    title: "Nosso Planeta",
    overview: "Documentário que explora as maravilhas naturais do mundo, revelando como as mudanças climáticas afetam todas as criaturas vivas.",
    poster: `${POSTER_BASE}/uyHo2eyLRwTiuMOUMoyMRGqdCY.jpg`,
    backdrop: `${BACKDROP_BASE}/szKCfBQNjnfJJZdcOl4KcbSxJnJ.jpg`,
    rating: 9.0,
    year: 2023,
    duration: "4 episódios",
    genres: ["Documentário", "Natureza"],
    type: "documentary",
  },
  {
    id: 8,
    title: "O Dilema das Redes",
    overview: "Especialistas em tecnologia alertam sobre os perigos das redes sociais e como elas manipulam o comportamento humano.",
    poster: `${POSTER_BASE}/el266bHnWCAzYjRByjkCmCnUvGE.jpg`,
    backdrop: `${BACKDROP_BASE}/rjBwhsOzHKUw2NIOrE7aMqjfe6s.jpg`,
    rating: 7.6,
    year: 2020,
    duration: "1h 34min",
    genres: ["Documentário", "Tecnologia"],
    type: "documentary",
  },
  {
    id: 9,
    title: "Wonka",
    overview: "Baseado no personagem de Roald Dahl, a história de como o jovem Willy Wonka conheceu os Oompa-Loompas e se tornou o famoso chocolateiro.",
    poster: `${POSTER_BASE}/qhb1qOilapbapxWQn9jtRCMwXJF.jpg`,
    backdrop: `${BACKDROP_BASE}/yOm993lsJyPmBodlYjgpPwBjXP9.jpg`,
    rating: 7.2,
    year: 2023,
    duration: "1h 56min",
    genres: ["Aventura", "Fantasia"],
    type: "movie",
  },
  {
    id: 10,
    title: "Slow Horses",
    overview: "Agentes de inteligência britânicos relegados a um departamento de fracassados do MI5 se veem envolvidos em conspirações mortais.",
    poster: `${POSTER_BASE}/dnrE3MN55LqBriV6FedxS32wjJb.jpg`,
    backdrop: `${BACKDROP_BASE}/4FPNHgmfRSZLs2VxMqEPs9oAdAb.jpg`,
    rating: 8.2,
    year: 2024,
    duration: "3 temporadas",
    genres: ["Thriller", "Espionagem"],
    type: "series",
  },
  {
    id: 11,
    title: "Planeta Terra III",
    overview: "Uma jornada cinematográfica espetacular pelos habitats mais diversos e fascinantes do planeta Terra.",
    poster: `${POSTER_BASE}/iPiqhSBWBvT0fMwF2CNoLjJfJaK.jpg`,
    backdrop: `${BACKDROP_BASE}/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg`,
    rating: 9.2,
    year: 2023,
    duration: "8 episódios",
    genres: ["Documentário", "Natureza"],
    type: "documentary",
  },
  {
    id: 12,
    title: "Napoleão",
    overview: "Uma análise da ascensão e queda de Napoleão Bonaparte, focando em suas estratégias militares e relacionamento com Josephine.",
    poster: `${POSTER_BASE}/jE5o7y9K6pZtWNNMXMGEx7lMBhn.jpg`,
    backdrop: `${BACKDROP_BASE}/tU4YIN1FGpWo9OzRYkGgOUjMFGQ.jpg`,
    rating: 6.5,
    year: 2023,
    duration: "2h 38min",
    genres: ["Ação", "Drama"],
    type: "movie",
  },
];

export const getMoviesByType = (type: Movie["type"]) =>
  movies.filter((m) => m.type === type);

export const getTrending = () =>
  [...movies].sort((a, b) => b.rating - a.rating).slice(0, 8);

export const getNewReleases = () =>
  [...movies].sort((a, b) => b.year - a.year).slice(0, 8);

export const getRecommended = () =>
  [...movies].sort(() => Math.random() - 0.5).slice(0, 8);

export const getMovieById = (id: number) =>
  movies.find((m) => m.id === id);
