import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: '이메일', example: 'user@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: '패스워드', example: 'password123'})
  @IsString()
  @IsNotEmpty()
  password: string
}