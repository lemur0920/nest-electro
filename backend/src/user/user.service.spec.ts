import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.req.dto.ts';
import { UserResponseDto } from './dto/user.res.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    
    service = module.get<UserService>(UserService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 2. create() 성공 시나리오
  it('should create a user', async () => {
    const requestDto = plainToInstance(CreateUserDto, {
      email: 'test@test.com',
      name: 'tester',
      password: 'tester123',
    })

    const returnEntity = { 
      id: 1,
      email: 'test@test.com',
      name: 'tester'
      };
      
    mockPrisma.user.create.mockResolvedValue(returnEntity); // mocking 된 create 반환값 설정
    
    const result = await service.createUser(requestDto);
    const expected = plainToInstance(UserResponseDto, returnEntity);
    
    expect(result).toBeInstanceOf(UserResponseDto);
    expect(result).toEqual(expected);
  })
});
