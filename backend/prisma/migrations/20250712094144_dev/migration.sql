/*
  Warnings:

  - You are about to drop the column `userId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `trackingToken` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tracking_token]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_trackingToken_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "trackingToken",
ADD COLUMN     "tracking_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_tracking_token_key" ON "Order"("tracking_token");
