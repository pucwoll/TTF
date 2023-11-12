/*
  Warnings:

  - Added the required column `arrival_station_id` to the `journeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrival_time` to the `journeys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "journeys" ADD COLUMN     "arrival_station_id" TEXT NOT NULL,
ADD COLUMN     "arrival_time" TEXT NOT NULL;
