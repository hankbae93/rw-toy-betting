/*
  Warnings:

  - Added the required column `amount` to the `UserBetOption` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `UserBetOption` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BetOption" ADD COLUMN "volume" INTEGER DEFAULT 0;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserBetOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "betOptionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserBetOption_betOptionId_fkey" FOREIGN KEY ("betOptionId") REFERENCES "BetOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserBetOption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserBetOption" ("betOptionId", "id", "userId") SELECT "betOptionId", "id", "userId" FROM "UserBetOption";
DROP TABLE "UserBetOption";
ALTER TABLE "new_UserBetOption" RENAME TO "UserBetOption";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
