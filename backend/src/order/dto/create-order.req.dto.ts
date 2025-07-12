import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";

export class CreateOrderProductDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [CreateOrderProductDto] })
  @Type(() => CreateOrderProductDto)  
  @ValidateNested({ each: true })
  @IsArray()
  products: CreateOrderProductDto[];
  
}

