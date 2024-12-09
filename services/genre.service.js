const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class GenreService {
  async createGenre(data) {
    return await prisma.genre.create({
      data: {
        name: data.name,
        movies: {
          connect: data.movies.map((movieId) => ({ id: movieId })),
        },
      },
    });
  }

  async getGenreById(id) {
    return await prisma.genre.findUnique({
      where: { id: id },
      include: { movies: true },
    });
  }

  async updateGenre(id, data) {
    return await prisma.genre.update({
      where: { id: id },
      data: {
        name: data.name,
        movies: {
          set: data.movies.map((movieId) => ({ id: movieId })),
        },
      },
    });
  }

  async deleteGenre(id) {
    return await prisma.genre.delete({
      where: { id: id },
    });
  }

  async getAllGenres() {
    return await prisma.genre.findMany({
      include: { movies: true },
    });
  }
}

module.exports = new GenreService();
