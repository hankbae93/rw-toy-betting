/*
  Warnings:

  - Added the required column `title` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "startTime" DATETIME,
    "endTime" DATETIME,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "totalVolume" INTEGER DEFAULT 0,
    "betMode" TEXT NOT NULL
);
INSERT INTO "new_Bet" ("betMode", "category", "endTime", "id", "isComplete", "startTime", "totalVolume") SELECT "betMode", "category", "endTime", "id", "isComplete", "startTime", "totalVolume" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
