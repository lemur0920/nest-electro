import { Body, Controller, Delete, Get, Logger, Patch, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user.res.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { CreateUserDto } from './dto/create-user.req.dto.ts';
import { UpdateUserDto } from './dto/update-user.req.dto';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';

@ApiTags('users') // Swagger 태그
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}
  
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '전체 유저 조회' })
  @Serialize(UserResponseDto)
  @Get()
  async findAll(): Promise<ResponseDto<UserResponseDto[]>> {
    const users = await this.userService.findAll(); 
    return ResponseDto.success({
      message: '전체 유저 조회 성공', 
      data: users
    });
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @Serialize(UserResponseDto)
  @Patch()
  async updateUser(
    @Session() session: Record<string, any>,
    @Body() updateUserDto: UpdateUserDto) 
  : Promise<ResponseDto<UserResponseDto>> {
    const userId = session.userId
    if (!userId) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.UNAUTHENTICATED);
    }
    const user = await this.userService.updateUser(userId, updateUserDto);
    return ResponseDto.success({
      message: '유저 정보 수정 성공',
      data: user
    });
  }

  @ApiOperation({ summary: '회원 탈퇴' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: 'password123' },
      },
        required: ['password'],
        description: '비밀번호를 body에 담아 전달'
      },
  })
  @Delete()
  async deleteUser(
    @Session() session: Record<string, any>,
    @Body('password') password: string
  ): Promise<ResponseDto<void>> {
    const userId = session.userId
    if (!userId) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.UNAUTHENTICATED);
    }
    const deletedUser = await this.userService.deleteUser(userId, password);
    return ResponseDto.success({
      message: '유저 삭제 성공',
    })
  }

  

  // @Get()
  // async findUserById(): Promise<UserResponseDto> {
    // return this.userService.findUserById(userId);
  // }

}
