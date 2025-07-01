import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserResponseDto } from './dto/user.res.dto';
import { CreateUserDto } from './dto/create-user.req.dto.ts';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new CustomException(EXCEPTION_STATUS.USER.CONFLICT)
    }
    
    const createdUser = await this.prisma.createUser(createUserDto);
    
    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name
    }
  }
  
  async findUserById(userId: string) {
    
  }

  async updateUser(userId: string, updateData: any) {

  }

  async deleteUser(userId: string) {

  }
}
