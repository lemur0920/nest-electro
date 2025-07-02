import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: '이메일', example: 'tester@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ description: '패스워드', example: 'tester123'})
  @IsString()
  @IsNotEmpty()
  password: string
}