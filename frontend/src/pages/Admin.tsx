import { useEffect, useState } from "react";
import { api } from "../services/api";

type Movie = {
  id: number;
  title: string;
  duration: number;
  schedule: string[];
};

export default function Admin() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [schedule, setSchedule] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchMovies = () => {
    api.get("/movies").then(res => setMovies(res.data));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addOrUpdateMovie = () => {
    if (!title || !duration || !schedule) return;
    const movieData = {
      title,
      duration: Number(duration),
      schedule: schedule.split(",").map(s => s.trim())
    };
    if (editingId) {
      api.put(`/movies/${editingId}`, movieData).then(() => {
        fetchMovies();
        resetForm();
      });
    } else {
      api.post("/movies", movieData).then(() => {
        fetchMovies();
        resetForm();
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setDuration("");
    setSchedule("");
    setEditingId(null);
  };

  const editMovie = (movie: Movie) => {
    setTitle(movie.title);
    setDuration(movie.duration.toString());
    setSchedule(movie.schedule.join(", "));
    setEditingId(movie.id);
  };

  const deleteMovie = (id: number) => {
    api.delete(`/movies/${id}`).then(() => {
      fetchMovies();
    });
  };

  return (
    <div className="page-content">
      <div className="form-container">
        <h2>{editingId ? "Edit Movie" : "Add Movie"}</h2>
        <div className="form-group">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Movie title"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            placeholder="Duration (min)"
          />
        </div>
        <div className="form-group">
          <input
            value={schedule}
            onChange={e => setSchedule(e.target.value)}
            placeholder="Schedule (comma separated)"
          />
        </div>
        <button onClick={addOrUpdateMovie}>{editingId ? "Update" : "Add"} movie</button>
        {editingId && <button onClick={resetForm}>Cancel</button>}
      </div>
      <h2>Movies</h2>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration (min)</th>
            <th>Showtimes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.duration}</td>
              <td>{movie.schedule.join(", ")}</td>
              <td>
                <button className="edit" onClick={() => editMovie(movie)}>Edit</button>
                <button className="delete" onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
