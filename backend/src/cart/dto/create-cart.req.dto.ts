export class CreateCartItemDto {
  cartId: number;        
  userId: number;     
  productId: number;   
  categoryId: number; 
  quantity: number;   
  price: number;      
}

export class CreateCartDto {
  userId?: number
  sessionToken?: string
}