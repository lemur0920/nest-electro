import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.req.dto.ts';
import { UserResponseDto } from './dto/user.res.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import { toDto } from 'src/common/utils/to-dto.util';

describe('UserService', () => {
  let service: UserService;
  const mockPrisma = {
    user: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
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
      
    mockPrisma.user.create.mockResolvedValue(returnEntity); 
    
    const result = await service.createUser(requestDto);
    const expected = plainToInstance(UserResponseDto, returnEntity);
    
    expect(result).toBeInstanceOf(UserResponseDto);
    expect(result).toEqual(expected);
  })

  it('should get all users', async () => {
    const userEntities = [
      { id: 1, email: 'user1@example.com', name: 'UserOne' },
      { id: 2, email: 'user2@example.com', name: 'UserTwo' },
    ];

    mockPrisma.user.findMany.mockResolvedValue(userEntities);

    const result = await service.findAll();
    const expected = plainToInstance(UserResponseDto, userEntities);

    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual(expected);
  })

  it('should update a user', async () => {
    const existedUser = {
      id: 1, email: 'user1@example.com', name: 'UserOne', password: 'user1'
    };
    const updateUserDto = {
      name: 'updated',
      password: 'updatedPassword'
    } 
    const updatedUser = {
      id: 1, email: 'user1@example.com', name: 'updated', password: 'hashedPassword'
    } 
    
    mockPrisma.user.findFirst.mockResolvedValue(existedUser); // 리턴 정의
    mockPrisma.user.update.mockResolvedValue(updatedUser);

    const result = await service.updateUser(1, updateUserDto);
    const expected = plainToInstance(UserResponseDto, updatedUser);

    console.log(mockPrisma.user.findFirst.mock.calls);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: 'updated',
        password: expect.any(String)
      }
    });

    expect(result).toEqual(toDto(UserResponseDto, updatedUser));
  })

  it('should delete a user', async () => {
    const user = { id: 1, email: 'user1@example.com', name: 'goodbye', password: 'hashedPassword' };
    mockPrisma.user.findUnique.mockResolvedValue(user);
    mockPrisma.user.delete.mockResolvedValue(undefined);
    
    await service.deleteUser(1, 'hashedPassword');
    
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
