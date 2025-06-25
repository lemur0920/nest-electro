import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserResponseDto } from './dto/user.res.dto';
import { UserCreateDto } from './dto/user-create.req.dto.ts';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}

  async createUser(userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    newUser = userCreateDto
  }
  
  async findUserById(userId: string) {
    
  }

  async updateUser(userId: string, updateData: any) {

  }

  async deleteUser(userId: string) {

  }
}
