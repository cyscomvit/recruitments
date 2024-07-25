-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "regno" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "department1" TEXT NOT NULL,
    "reason1" TEXT NOT NULL,
    "department2" TEXT NOT NULL,
    "reason2" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
