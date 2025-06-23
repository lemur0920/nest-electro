import { IsString } from "class-validator";

export class UserCreateDto {
  @IsString()
  email: string
  
  @IsString()
  name: string

  @IsString()
  password: string
}