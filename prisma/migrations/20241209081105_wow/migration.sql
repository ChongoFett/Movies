/*
  Warnings:

  - You are about to drop the column `directorId` on the `movie` table. All the data in the column will be lost.
  - The primary key for the `movieactor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actorId` on the `movieactor` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `movieactor` table. All the data in the column will be lost.
  - The primary key for the `moviegenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genreId` on the `moviegenre` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `moviegenre` table. All the data in the column will be lost.
  - Added the required column `director_Id` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actor_Id` to the `MovieActor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_Id` to the `MovieActor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre_Id` to the `MovieGenre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_Id` to the `MovieGenre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `Movie_directorId_fkey`;

-- DropForeignKey
ALTER TABLE `movieactor` DROP FOREIGN KEY `MovieActor_actorId_fkey`;

-- DropForeignKey
ALTER TABLE `movieactor` DROP FOREIGN KEY `MovieActor_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviegenre` DROP FOREIGN KEY `MovieGenre_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `moviegenre` DROP FOREIGN KEY `MovieGenre_movieId_fkey`;

-- AlterTable
ALTER TABLE `movie` DROP COLUMN `directorId`,
    ADD COLUMN `director_Id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `movieactor` DROP PRIMARY KEY,
    DROP COLUMN `actorId`,
    DROP COLUMN `movieId`,
    ADD COLUMN `actor_Id` INTEGER NOT NULL,
    ADD COLUMN `movie_Id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`movie_Id`, `actor_Id`);

-- AlterTable
ALTER TABLE `moviegenre` DROP PRIMARY KEY,
    DROP COLUMN `genreId`,
    DROP COLUMN `movieId`,
    ADD COLUMN `genre_Id` INTEGER NOT NULL,
    ADD COLUMN `movie_Id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`movie_Id`, `genre_Id`);

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_movie_Id_fkey` FOREIGN KEY (`movie_Id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieActor` ADD CONSTRAINT `MovieActor_actor_Id_fkey` FOREIGN KEY (`actor_Id`) REFERENCES `Actor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_movie_Id_fkey` FOREIGN KEY (`movie_Id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieGenre` ADD CONSTRAINT `MovieGenre_genre_Id_fkey` FOREIGN KEY (`genre_Id`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_director_Id_fkey` FOREIGN KEY (`director_Id`) REFERENCES `Director`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
