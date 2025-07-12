import { Expose, Type } from "class-transformer";

export class CartItemResponseDto {
  @Expose()
  id: number;

  @Expose()
  productId: number;

  @Expose()
  categoryId: number;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt?: Date; // 소프트 삭제 여부
}

export class CartResponseDto {
  @Type(() => CartItemResponseDto)
  cartItems: CartItemResponseDto[]

  get getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}