const express = require("express");
const router = express.Router();
const ActorService = require("./actor.service");

router.post("/", async (req, res) => {
  try {
    const actor = await ActorService.createActor(req.body);
    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const actor = await ActorService.getActorById(req.params.id);
    if (actor) {
      res.status(200).json(actor);
    } else {
      res.status(404).json({ error: "Actor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actor = await ActorService.updateActor(req.params.id, req.body);
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ActorService.deleteActor(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const actors = await ActorService.getAllActors();
    res.status(200).json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as actorController };
