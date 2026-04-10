import { useQuery } from "@tanstack/react-query";
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getPopularSeries,
  getDocumentaries,
  getNowPlaying,
  getMovieDetails,
  getRecommendations,
  searchContent,
  discoverByType,
} from "@/lib/tmdb";

export const useTrending = () =>
  useQuery({ queryKey: ["trending"], queryFn: getTrending, staleTime: 1000 * 60 * 10 });

export const usePopularMovies = () =>
  useQuery({ queryKey: ["popular-movies"], queryFn: getPopularMovies, staleTime: 1000 * 60 * 10 });

export const useTopRatedMovies = () =>
  useQuery({ queryKey: ["top-rated"], queryFn: getTopRatedMovies, staleTime: 1000 * 60 * 10 });

export const usePopularSeries = () =>
  useQuery({ queryKey: ["popular-series"], queryFn: getPopularSeries, staleTime: 1000 * 60 * 10 });

export const useDocumentaries = () =>
  useQuery({ queryKey: ["documentaries"], queryFn: getDocumentaries, staleTime: 1000 * 60 * 10 });

export const useNowPlaying = () =>
  useQuery({ queryKey: ["now-playing"], queryFn: getNowPlaying, staleTime: 1000 * 60 * 10 });

export const useMovieDetails = (id: number, mediaType: "movie" | "tv") =>
  useQuery({
    queryKey: ["details", mediaType, id],
    queryFn: () => getMovieDetails(id, mediaType),
    enabled: !!id,
  });

export const useRecommendations = (id: number, mediaType: "movie" | "tv") =>
  useQuery({
    queryKey: ["recommendations", mediaType, id],
    queryFn: () => getRecommendations(id, mediaType),
    enabled: !!id,
  });

export const useSearch = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: () => searchContent(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

export const useDiscover = (type: "movie" | "series" | "documentary") =>
  useQuery({
    queryKey: ["discover", type],
    queryFn: () => discoverByType(type),
    staleTime: 1000 * 60 * 10,
  });
