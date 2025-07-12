/*
  Warnings:

  - You are about to drop the column `category_id` on the `OrderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `OrderProduct` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_at_order` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name_at_order` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total_price" INTEGER NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "category_id",
DROP COLUMN "user_id",
ADD COLUMN     "price_at_order" INTEGER NOT NULL,
ADD COLUMN     "product_name_at_order" TEXT NOT NULL;
