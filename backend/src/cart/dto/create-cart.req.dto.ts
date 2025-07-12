export class CreateCartItemDto {
  productId: number;   
  quantity: number;   
  price: number;      
  userId?: number;

  categoryId: number;
}

export class CreateCartDto {
  userId?: number
  sessionToken?: string

  items: CreateCartItemDto[]
}