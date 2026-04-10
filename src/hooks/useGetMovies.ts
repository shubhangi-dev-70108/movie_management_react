import axios from "axios";
import { useState, useEffect } from "react";
import type { Movie, UseGetMoviesProps } from "../types";

function useGetMovies(): UseGetMoviesProps {
  //
  const [arrayList, setArrayList] = useState<Movie[]>([]); ///original API list
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); ///update list sort/search
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then(({ data }: any) => {
        setArrayList(data);
        setFilteredMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError('"Failed to load movies"');
        setLoading(false);
      });
  }, []);

  return {
    arrayList,
    filteredMovies,
    setFilteredMovies,
    loading,
    error,
  };
}

export default useGetMovies;
