import { useEffect, useState } from "react";
import { api } from "../services/api";

type Movie = {
  id: number;
  title: string;
  duration: number;
  schedule: string[];
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get("/movies").then(res => setMovies(res.data));
  }, []);

  return (
    <div className="page-content">
      <h1>Movies</h1>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Showtimes</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.duration} min</td>
              <td>{movie.schedule.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
