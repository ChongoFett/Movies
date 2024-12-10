import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createActor(data) {
  return await prisma.actor.create({
    data: {
      name: data.name,
      movies: {
        connect: data.movies.map((movieId) => ({ id: movieId })),
      },
    },
  });
}

export async function getActorById(id) {
  return await prisma.actor.findUnique({
    where: { id: id },
    include: { movies: true },
  });
}

export async function updateActor(id, data) {
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

export async function deleteActor(id) {
  return await prisma.actor.delete({
    where: { id: id },
  });
}

export async function getAllActors() {
  return await prisma.actor.findMany({
    include: { movies: true },
  });
}