/*
  Warnings:

  - You are about to drop the column `entry_time` on the `configs` table. All the data in the column will be lost.
  - You are about to drop the column `exit_time` on the `configs` table. All the data in the column will be lost.
  - You are about to drop the column `lunch_end_time` on the `configs` table. All the data in the column will be lost.
  - You are about to drop the column `lunch_start_time` on the `configs` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "daily_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_of_week" INTEGER NOT NULL,
    "entry_time" INTEGER NOT NULL,
    "exit_time" INTEGER NOT NULL,
    "lunch_start_time" INTEGER NOT NULL,
    "lunch_end_time" INTEGER NOT NULL,
    "config_id" TEXT NOT NULL,
    CONSTRAINT "daily_schedules_config_id_fkey" FOREIGN KEY ("config_id") REFERENCES "configs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_configs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "configs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_configs" ("id", "user_id") SELECT "id", "user_id" FROM "configs";
DROP TABLE "configs";
ALTER TABLE "new_configs" RENAME TO "configs";
CREATE UNIQUE INDEX "configs_user_id_key" ON "configs"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "daily_schedules_config_id_day_of_week_key" ON "daily_schedules"("config_id", "day_of_week");
