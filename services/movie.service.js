import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listAllMovies() {
  return await prisma.movie.findMany({
    include: {
      director: true,
      actors: {
        include: {
          actor: true,
        },
      },
      genres: {
        include: {
          genre: true,
        },
      },
    },
  });
}

export async function getMovieById(id) {
  return await prisma.movie.findUnique({
    where: { id: Number(id) },
    include: {
      director: true,
      actors: {
        include: {
          actor: true,
        },
      },
      genres: {
        include: {
          genre: true,
        },
      },
    },
  });
}

export async function addMovie(movieData) {
  return await prisma.movie.create({
    data: {
      ...movieData,
      director: {
        connect: { id: movieData.director_Id },
      },
      actors: {
        create: movieData.actors.map((actorId) => ({
          actor: { connect: { id: actorId } },
        })),
      },
      genres: {
        create: movieData.genres.map((genreId) => ({
          genre: { connect: { id: genreId } },
        })),
      },
    },
  });
}

export async function editMovie(id, movieData) {
  return await prisma.movie.update({
    where: { id: Number(id) },
    data: {
      ...movieData,
      director: {
        connect: { id: movieData.director_Id },
      },
      actors: {
        deleteMany: {},
        create: movieData.actors.map((actorId) => ({
          actor: { connect: { id: actorId } },
        })),
      },
      genres: {
        deleteMany: {},
        create: movieData.genres.map((genreId) => ({
          genre: { connect: { id: genreId } },
        })),
      },
    },
  });
}

export async function deleteMovie(id) {
  return await prisma.movie.delete({
    where: { id: Number(id) },
  });
}

export async function addActorToMovie(movieId, actorId) {
  return await prisma.movieActor.create({
    data: {
      movie_Id: Number(movieId),
      actor_Id: Number(actorId),
    },
  });
}

export async function removeActorFromMovie(movieId, actorId) {
  return await prisma.movieActor.delete({
    where: {
      movie_Id_actor_Id: {
        movie_Id: Number(movieId),
        actor_Id: Number(actorId),
      },
    },
  });
}

export async function addGenreToMovie(movieId, genreId) {
  return await prisma.movieGenre.create({
    data: {
      movie_Id: Number(movieId),
      genre_Id: Number(genreId),
    },
  });
}

export async function removeGenreFromMovie(movieId, genreId) {
  return await prisma.movieGenre.delete({
    where: {
      movie_Id_genre_Id: {
        movie_Id: Number(movieId),
        genre_Id: Number(genreId),
      },
    },
  });
}
