-- CreateTable
CREATE TABLE "Justification" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "reason" TEXT NOT NULL DEFAULT 'Abono total',
    "minutes" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Justification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Justification_userId_date_key" ON "Justification"("userId", "date");

-- AddForeignKey
ALTER TABLE "Justification" ADD CONSTRAINT "Justification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
