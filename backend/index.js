const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let movies = [
  {
    id: 1,
    title: "Inception",
    duration: 148,
    schedule: ["18:00", "21:00"]
  }
];

// GET all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// ADD movie
app.post("/movies", (req, res) => {
  const newMovie = {
    id: Date.now(),
    ...req.body
  };
  movies.push(newMovie);
  res.json(newMovie);
});

// UPDATE movie
app.put("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  movies = movies.map(m =>
    m.id === id ? { ...m, ...req.body } : m
  );
  res.json({ message: "Movie updated" });
});

// DELETE movie
app.delete("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  movies = movies.filter(m => m.id !== id);
  res.json({ message: "Movie deleted" });
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
