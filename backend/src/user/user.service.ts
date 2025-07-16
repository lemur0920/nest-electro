import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserResponseDto } from './dto/user.res.dto';
import { CreateUserDto } from './dto/create-user.req.dto.ts';
import { UpdateUserDto } from './dto/update-user.req.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';
import { plainToInstance } from 'class-transformer';
import { toDto } from 'src/common/utils/to-dto.util';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor (
    private prisma: PrismaService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: hashedPassword,
        }
      })
      
      // return {
        // id: newUser.id,
        // email: newUser.email,
        // name: newUser.name
      // };

      return toDto(UserResponseDto, newUser); // 헬퍼 함수 사용
      
    } catch (error) {
      // Prisma unique constraint violated
      if (error.code === 'P2002') {
        const { errorCode, message, statusCode } = EXCEPTION_STATUS.USER.EMAIL_CONFLICT;
        throw new CustomException({errorCode, message, statusCode})
      }
    }
  }
  
  async findUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })
    if (!user) {
      throw new CustomException(EXCEPTION_STATUS.USER.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email }
    })

    if (!user) {
      throw new CustomException(EXCEPTION_STATUS.USER.NOT_FOUND);
    }
    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updateData: Partial<UpdateUserDto> = {};
    if (updateUserDto.name) {
      updateData.name = updateUserDto.name
    }
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData
    })

    return toDto(UserResponseDto, updatedUser);
  }

  async deleteUser(userId: number, password: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user && isPasswordValid) {
      throw new CustomException(EXCEPTION_STATUS.USER.INVALID_PASSWORD);
    }

    await this.prisma.user.delete({
      where: { id: userId }
    })
  }
}
