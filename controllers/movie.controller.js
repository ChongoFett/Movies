import express from "express";
import {
  listAllMovies,
  getMovieById,
  addMovie,
  editMovie,
  deleteMovie,
  addActorToMovie,
  removeActorFromMovie,
  addGenreToMovie,
  removeGenreFromMovie,
} from "../services/movie.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const data = await listAllMovies();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await getMovieById(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const movieData = req.body;
    const newMovie = await addMovie(movieData);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: "Error creating movie" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movieData = req.body;
    const updatedMovie = await editMovie(id, movieData);
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(409).json({ message: "Error updating movie" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMovie(id);
    res.status(204).json({ message: "Movie successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:movieId/actors/:actorId", async (req, res) => {
  try {
    const { movieId, actorId } = req.params;
    await addActorToMovie(movieId, actorId);
    res.status(201).json({ message: "Actor successfully added to movie" });
  } catch (error) {
    res.status(409).json({ message: "Error adding actor to movie" });
  }
});

router.delete("/:movieId/actors/:actorId", async (req, res) => {
  try {
    const { movieId, actorId } = req.params;
    await removeActorFromMovie(movieId, actorId);
    res.status(204).json({ message: "Actor successfully removed from movie" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:movieId/genres/:genreId", async (req, res) => {
  try {
    const { movieId, genreId } = req.params;
    await addGenreToMovie(movieId, genreId);
    res.status(201).json({ message: "Genre successfully added to movie" });
  } catch (error) {
    res.status(409).json({ message: "Error adding genre to movie" });
  }
});

router.delete("/:movieId/genres/:genreId", async (req, res) => {
  try {
    const { movieId, genreId } = req.params;
    await removeGenreFromMovie(movieId, genreId);
    res.status(204).json({ message: "Genre successfully removed from movie" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as movieController };
