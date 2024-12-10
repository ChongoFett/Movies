import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDirector(data) {
  return await prisma.director.create({
    data: {
      name: data.name,
      movies: {
        connect: data.movies.map((movieId) => ({ id: movieId })),
      },
    },
  });
}

export async function getDirectorById(id) {
  return await prisma.director.findUnique({
    where: { id: id },
    include: { movies: true },
  });
}

export async function updateDirector(id, data) {
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

export async function deleteDirector(id) {
  return await prisma.director.delete({
    where: { id: id },
  });
}

export async function getAllDirectors() {
  return await prisma.director.findMany({
    include: { movies: true },
  });
}
