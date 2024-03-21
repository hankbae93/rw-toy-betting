-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BetOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "average" INTEGER DEFAULT 0,
    "betId" INTEGER NOT NULL,
    CONSTRAINT "BetOption_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BetOption" ("average", "betId", "content", "id") SELECT "average", "betId", "content", "id" FROM "BetOption";
DROP TABLE "BetOption";
ALTER TABLE "new_BetOption" RENAME TO "BetOption";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
