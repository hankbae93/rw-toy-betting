-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "tokenBalance" INTEGER NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "isComplete" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "totalVolume" INTEGER NOT NULL,
    "betMode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BetOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "average" INTEGER NOT NULL,
    "betId" INTEGER NOT NULL,
    CONSTRAINT "BetOption_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserBetOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "betOptionId" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "UserBetOption_betOptionId_fkey" FOREIGN KEY ("betOptionId") REFERENCES "BetOption" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserBetOption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
