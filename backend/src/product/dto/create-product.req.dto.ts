import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: '카테고리', example: '1' })
  @IsNumber()
  categoryId: number;
  
  @ApiProperty({ description: '제품명', example: 'G Pro SuperLight2' })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty({ description: '가격', example: '160000' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: '제품설명', example: '최신 마우스 모델입니다.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '재고', example: '3' })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({ description: '제조사', example: '로지텍' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ description: '이미지 경로', example: 'logitec_gshura.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: '할인여부', example: 'false' })
  @IsOptional()
  isSale?: boolean;

  @ApiProperty({ description: '출시일', example: '2023-10-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  releasedAt?: string | null;
}