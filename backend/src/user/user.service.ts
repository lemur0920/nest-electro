import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserResponseDto } from './dto/user.res.dto';
import { UserCreateDto } from './dto/user-create.req.dto.ts';
import * as bcrypt from 'bcrypt';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor (
    private prisma: PrismaService,
  ) {}

  async createUser(userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    try {
      const hashedPassword = await bcrypt.hash(userCreateDto.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          email: userCreateDto.email,
          name: userCreateDto.name,
          password: hashedPassword,
        }
      })
      
      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
    } catch (error ) {
      // Prisma unique constraint violated
      if (error.code === 'P2002') {
        const { errorCode, message, statusCode } = EXCEPTION_STATUS.USER.EMAIL_CONFLICT;
        throw new CustomException(errorCode, message, statusCode)
      }
    }
  }
  async findUserById(userId: string) {
    
  }

  async updateUser(userId: string, updateData: any) {

  }

  async deleteUser(userId: string) {

  }
}
