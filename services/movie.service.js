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
}

module.exports = new MovieService();
