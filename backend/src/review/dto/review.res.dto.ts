import { Expose } from "class-transformer"

export class ReviewResponseDto {
  @Expose()
  userId: number
  @Expose()
  productId: number
  @Expose()
  categoryId: number
  @Expose()
  rating: number
  @Expose()
  content: string
  @Expose()
  createdAt: Date
  @Expose()
  updatedAt: Date
}