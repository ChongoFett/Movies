import express from "express";
import {
  createGenre,
  getGenreById,
  updateGenre,
  deleteGenre,
  getAllGenres,
} from "../services/genre.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const data = await getAllGenres();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newGenre = await createGenre(data);
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(409).json({ message: "Error creating genre" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await getGenreById(id);
    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedGenre = await updateGenre(id, data);
    res.status(200).json(updatedGenre);
  } catch (error) {
    res.status(409).json({ message: "Error updating genre" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteGenre(id);
    res.status(204).json({ message: "Genre successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as genreController };
