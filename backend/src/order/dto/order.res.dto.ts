import { Expose, Type } from "class-transformer";

export class OrderProductResponseDto {
  @Expose()
  id: number;
  @Expose()
  productId: number;
  @Expose()
  quantity: number;
  @Expose()
  priceAtOrder: number;
  @Expose()
  productNameAtOrder: string; // 새로 추가
}

export class OrderResponseDto {
  @Expose()
  id: number;
  @Expose()
  userId: number | null;
  @Expose()
  totalPrice: number;
  @Expose()
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  @Expose()
  trackingToken: string | null;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  @Type(() => OrderProductResponseDto) // ✅ 배열 타입 명시
  orderProducts: OrderProductResponseDto[];
}