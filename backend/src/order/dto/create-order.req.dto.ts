import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateOrderProductDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  quantity: number;
}

