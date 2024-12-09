const express = require("express");
const router = express.Router();
const GenreService = require("./genre.service");

router.post("/", async (req, res) => {
  try {
    const genre = await GenreService.createGenre(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await GenreService.getGenreById(req.params.id);
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ error: "Genre not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const genre = await GenreService.updateGenre(req.params.id, req.body);
    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await GenreService.deleteGenre(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const genres = await GenreService.getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as genreController };
