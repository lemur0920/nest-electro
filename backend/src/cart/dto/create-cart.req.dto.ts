import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsInt, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateCartItemDto {
  @ApiProperty({ description: '제품ID', example: '1'})
  @IsInt()
  productId: number;   
  @ApiProperty({ description: '수량', example: '3'})
  @IsInt()
  quantity: number;   
  @ApiProperty({ description: '가격', example: '79000'})
  @IsNumber()
  price: number;
  @ApiProperty({ description: '카테고리', example: '5'})
  @IsInt()
  categoryId: number;
}

export class CreateCartDto {
  userId?: number
  sessionToken?: string
  @ApiProperty({
    type: [CreateCartItemDto],
    description: '장바구니 아이템들',
    example: [
      {
        productId: 1,
        quantity: 2,
        price: 99900,
        categoryId: 3
      },
      {
        productId: 2,
        quantity: 4,
        price: 32800,
        categoryId: 2
      },
    ]
  })
  @Type(() => CreateCartItemDto)
  @ValidateNested({ each: true })
  cartItems: CreateCartItemDto[]
}