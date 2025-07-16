import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ description: '사용자 이름', example:'모티' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string

  @ApiProperty({ description: '사용자 비밀번호', example:'morty123' })
  @IsOptional()
  @IsString()
  password?: string
}