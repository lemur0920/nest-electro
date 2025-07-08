import { Expose } from "class-transformer";

export class ProductResponseDto {
  @Expose() 
  id: number;

  @Expose()
  categoryId: number;

  @Expose()
  name: string;

  @Expose()
  price: number

  @Expose()
  description: string;

  @Expose()
  stock: number;

  @Expose()
  company: string;

  @Expose()
  isSale: boolean;

  @Expose()
  image: string;

  @Expose()
  releasedAt: Date | null;
  
  @Expose()
  createdAt: Date | null;

  @Expose()
  updatedAt: Date | null;
  
}