import express from "express";
import {
  createActor,
  getActorById,
  updateActor,
  deleteActor,
  getAllActors,
} from "../services/actor.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const data = await getAllActors();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newActor = await createActor(data);
    res.status(201).json(newActor);
  } catch (error) {
    res.status(409).json({ message: "Error creating actor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await getActorById(id);
    if (actor) {
      res.status(200).json(actor);
    } else {
      res.status(404).json({ message: "Actor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedActor = await updateActor(id, data);
    res.status(200).json(updatedActor);
  } catch (error) {
    res.status(409).json({ message: "Error updating actor" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteActor(id);
    res.status(204).json({ message: "Actor successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as actorController };
