import express from "express";
import { actorController } from "./controllers/actor.controller.js";
import { directorController } from "./controllers/director.controller.js";
import { genreController } from "./controllers/genre.controller.js";
import { movieController } from "./controllers/movie.controller.js";

const app = express();

app.use(express.json());

app.use("/actors", actorController);
app.use("/directors", directorController);
app.use("/genres", genreController);
app.use("/movies", movieController);

app.listen(3300, () => {
  console.log("http://localhost:3300");
});
