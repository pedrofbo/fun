/*
  Warnings:

  - You are about to alter the column `weight` on the `Pokemon` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artworkUrl" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "firstType" TEXT NOT NULL,
    "secondType" TEXT
);
INSERT INTO "new_Pokemon" ("artworkUrl", "firstType", "height", "id", "name", "secondType", "weight") SELECT "artworkUrl", "firstType", "height", "id", "name", "secondType", "weight" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
