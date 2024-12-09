const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MovieService {
  async listAll() {
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

  async getById(id) {
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

  async add(movieData) {
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

  async edit(id, movieData) {
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

  async delete(id) {
    return await prisma.movie.delete({
      where: { id: Number(id) },
    });
  }
  
  async addActorToMovie(movieId, actorId) {
    return await prisma.movieActor.create({
      data: {
        movie_Id: Number(movieId),
        actor_Id: Number(actorId),
      },
    });
  }

  async removeActorFromMovie(movieId, actorId) {
    return await prisma.movieActor.delete({
      where: {
        movie_Id_actor_Id: {
          movie_Id: Number(movieId),
          actor_Id: Number(actorId),
        },
      },
    });
  }

  async addGenreToMovie(movieId, genreId) {
    return await prisma.movieGenre.create({
      data: {
        movie_Id: Number(movieId),
        genre_Id: Number(genreId),
      },
    });
  }

  async removeGenreFromMovie(movieId, genreId) {
    return await prisma.movieGenre.delete({
      where: {
        movie_Id_genre_Id: {
          movie_Id: Number(movieId),
          genre_Id: Number(genreId),
        },
      },
    });
  }
}

module.exports = new MovieService();
