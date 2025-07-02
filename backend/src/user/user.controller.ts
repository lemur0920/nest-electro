import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.req.dto.ts';
import { UserResponseDto } from './dto/user.res.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users') // Swagger 태그
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  async createUser(
    @Body() createUserDto: UserCreateDto): Promise<UserResponseDto> {
      return this.userService.createUser(createUserDto);
  }

  // @Get()
  // async findUserById(): Promise<UserResponseDto> {
    // return this.userService.findUserById(userId);
  // }

}
