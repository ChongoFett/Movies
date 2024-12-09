const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ActorService {
  async createActor(data) {
    return await prisma.actor.create({
      data: {
        name: data.name,
        movies: {
          connect: data.movies.map((movieId) => ({ id: movieId })),
        },
      },
    });
  }

  async getActorById(id) {
    return await prisma.actor.findUnique({
      where: { id: id },
      include: { movies: true },
    });
  }

  async updateActor(id, data) {
    return await prisma.actor.update({
      where: { id: id },
      data: {
        name: data.name,
        movies: {
          set: data.movies.map((movieId) => ({ id: movieId })),
        },
      },
    });
  }

  async deleteActor(id) {
    return await prisma.actor.delete({
      where: { id: id },
    });
  }

  async getAllActors() {
    return await prisma.actor.findMany({
      include: { movies: true },
    });
  }
}

module.exports = new ActorService();
