import express from "express";
import { actorController } from "./controllers/actor.controller.js";
import { directorControllerController } from "./controllers/director.controller.js";
import { genreController } from "./controllers/genre.controller.js";
import { movieController } from "./controllers/movie.controller.js";

const app = express();

app.listen(3300, () => {
  console.log("http://localhost:3300");
});
