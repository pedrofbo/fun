/*
  Warnings:

  - Added the required column `pokemonOfTheDayId` to the `FunFactOfTheDay` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PokemonOfTheDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pokemonId" INTEGER NOT NULL,
    "pokedexEntryId" TEXT NOT NULL,
    CONSTRAINT "PokemonOfTheDay_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PokemonOfTheDay_pokedexEntryId_fkey" FOREIGN KEY ("pokedexEntryId") REFERENCES "PokedexEntry" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artworkUrl" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "firstType" TEXT NOT NULL,
    "secondType" TEXT
);

-- CreateTable
CREATE TABLE "PokedexEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pokemonId" INTEGER NOT NULL,
    "entry" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    CONSTRAINT "PokedexEntry_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FunFactOfTheDay" (
    "date" DATETIME NOT NULL PRIMARY KEY,
    "funFactId" TEXT NOT NULL,
    "pokemonOfTheDayId" TEXT NOT NULL,
    CONSTRAINT "FunFactOfTheDay_funFactId_fkey" FOREIGN KEY ("funFactId") REFERENCES "FunFact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FunFactOfTheDay_pokemonOfTheDayId_fkey" FOREIGN KEY ("pokemonOfTheDayId") REFERENCES "PokemonOfTheDay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FunFactOfTheDay" ("date", "funFactId") SELECT "date", "funFactId" FROM "FunFactOfTheDay";
DROP TABLE "FunFactOfTheDay";
ALTER TABLE "new_FunFactOfTheDay" RENAME TO "FunFactOfTheDay";
CREATE UNIQUE INDEX "FunFactOfTheDay_funFactId_key" ON "FunFactOfTheDay"("funFactId");
CREATE UNIQUE INDEX "FunFactOfTheDay_pokemonOfTheDayId_key" ON "FunFactOfTheDay"("pokemonOfTheDayId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PokemonOfTheDay_pokemonId_key" ON "PokemonOfTheDay"("pokemonId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonOfTheDay_pokedexEntryId_key" ON "PokemonOfTheDay"("pokedexEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonOfTheDay_pokemonId_pokedexEntryId_key" ON "PokemonOfTheDay"("pokemonId", "pokedexEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "PokedexEntry_pokemonId_version_key" ON "PokedexEntry"("pokemonId", "version");
