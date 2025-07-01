import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

<<<<<<< HEAD:backend/src/user/dto/user-create.req.dto.ts.ts
export class UserCreateDto {
  @ApiProperty({ description: '사용자 이메일', example:'user@example.com' })
  @IsEmail()
=======
export class CreateUserDto {
  @IsString()
>>>>>>> e0b44f24b9a243165e8853b0b37f04843903433e:backend/src/user/dto/create-user.req.dto.ts.ts
  email: string
  
  @ApiProperty({ description: '사용자 이름', example: 'John Doe' })
  @IsString()
  name: string

  @ApiProperty({ description: '비밀번호', example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string  
}