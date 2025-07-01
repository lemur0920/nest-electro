import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.req.dto.ts';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  async createUser(userCreateDto: CreateUserDto) {
    return this.userService.createUser(userCreateDto);
  }
  
  
}
