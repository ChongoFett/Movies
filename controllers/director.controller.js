import express from "express";
import {
  createDirector,
  getDirectorById,
  updateDirector,
  deleteDirector,
  getAllDirectors,
} from "../services/director.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const data = await getAllDirectors();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newDirector = await createDirector(data);
    res.status(201).json(newDirector);
  } catch (error) {
    res.status(409).json({ message: "Error creating director" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const director = await getDirectorById(id);
    if (director) {
      res.status(200).json(director);
    } else {
      res.status(404).json({ message: "Director not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedDirector = await updateDirector(id, data);
    res.status(200).json(updatedDirector);
  } catch (error) {
    res.status(409).json({ message: "Error updating director" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDirector(id);
    res.status(204).json({ message: "Director successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as directorController };
