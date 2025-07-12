import { Type } from "class-transformer";

export class CartItemResponseDto {

}

export class CartResponseDto {
  @Type(() => CartItemResponseDto)
  cartItems: CartItemResponseDto[]
}