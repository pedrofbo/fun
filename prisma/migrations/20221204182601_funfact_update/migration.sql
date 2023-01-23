/*
  Warnings:

  - A unique constraint covering the columns `[funFactId]` on the table `FunFactOfTheDay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FunFactOfTheDay_funFactId_key" ON "FunFactOfTheDay"("funFactId");
