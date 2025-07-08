import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDto {
  @ApiPropertyOptional({ description: '카테고리', example: '1' })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
  
  @ApiPropertyOptional({ description: '제품명', example: 'G Pro SuperLightX' })
  @IsString()
  @IsOptional()
  name?: string;
  
  @ApiPropertyOptional({ description: '가격', example: '160000' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ description: '제품설명', example: '최신 마우스 모델입니다.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: '재고', example: '3' })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({ description: '제조사', example: '로지텍' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ description: '이미지 경로', example: 'logitec_gshura.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: '할인여부', example: true })
  @IsOptional()
  isSale?: boolean;

  @ApiPropertyOptional({ description: '출시일', example: '2023-10-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  releasedAt?: string | null;
}