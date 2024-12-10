import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createGenre(data) {
  return await prisma.genre.create({
    data: {
      name: data.name,
      movies: {
        connect: data.movies.map((movieId) => ({ id: movieId })),
      },
    },
  });
}

export async function getGenreById(id) {
  return await prisma.genre.findUnique({
    where: { id: id },
    include: { movies: true },
  });
}

export async function updateGenre(id, data) {
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

export async function deleteGenre(id) {
  return await prisma.genre.delete({
    where: { id: id },
  });
}

export async function getAllGenres() {
  return await prisma.genre.findMany({
    include: { movies: true },
  });
}
