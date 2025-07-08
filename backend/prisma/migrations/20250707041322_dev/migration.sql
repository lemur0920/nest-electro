/*
  Warnings:

  - You are about to drop the column `release_date` on the `Product` table. All the data in the column will be lost.
  - Added the required column `released_at` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "release_date",
ADD COLUMN     "released_at" TIMESTAMP(3) NOT NULL;
