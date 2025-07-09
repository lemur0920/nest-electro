import { Expose, Type } from "class-transformer";

export class OrderProductResponseDto {
  @Expose() id: number;
  @Expose() userId: number;
  @Expose() orderId: number;
  @Expose() productId: number;
  @Expose() categoryId: number;
  @Expose() quantity: number;
  @Expose() shippingStatus: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
  @Expose() deletedAt?: Date | null;
}

export class OrderResponseDto {
  @Expose() id: number;
  @Expose() userId: number;
  @Expose() status: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
  @Expose() deletedAt?: Date | null;

  @Expose()
  @Type(() => OrderProductResponseDto)
  orderProducts: OrderProductResponseDto[];
}