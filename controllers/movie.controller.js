const express = require("express");
const MovieService = require("./movie.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await MovieService.listAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await MovieService.getById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMovie = await MovieService.add(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedMovie = await MovieService.edit(req.params.id, req.body);
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await MovieService.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as movieController };
