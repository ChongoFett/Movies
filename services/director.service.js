const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DirectorService {
  async createDirector(data) {
    return await prisma.director.create({
      data: {
        name: data.name,
        movies: {
          connect: data.movies.map((movieId) => ({ id: movieId })),
        },
      },
    });
  }

  async getDirectorById(id) {
    return await prisma.director.findUnique({
      where: { id: id },
      include: { movies: true },
    });
  }

  async updateDirector(id, data) {
    return await prisma.director.update({
      where: { id: id },
      data: {
        name: data.name,
        movies: {
          set: data.movies.map((movieId) => ({ id: movieId })),
        },
      },
    });
  }

  async deleteDirector(id) {
    return await prisma.director.delete({
      where: { id: id },
    });
  }

  async getAllDirectors() {
    return await prisma.director.findMany({
      include: { movies: true },
    });
  }
}

module.exports = new DirectorService();
