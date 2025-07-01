import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  email: string
  
  @ApiProperty({ description: '사용자 이름', example: 'John Doe' })
  @IsString() 
  name: string

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string  
}