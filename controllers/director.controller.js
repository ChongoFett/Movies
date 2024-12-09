const express = require("express");
const router = express.Router();
const DirectorService = require("./director.service");

router.post("/", async (req, res) => {
  try {
    const director = await DirectorService.createDirector(req.body);
    res.status(201).json(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const director = await DirectorService.getDirectorById(req.params.id);
    if (director) {
      res.status(200).json(director);
    } else {
      res.status(404).json({ error: "Director not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const director = await DirectorService.updateDirector(
      req.params.id,
      req.body
    );
    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await DirectorService.deleteDirector(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const directors = await DirectorService.getAllDirectors();
    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as directorController };
