import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from 'prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { OrderResponseDto } from './dto/order.res.dto';
import { CustomException } from 'src/common/exceptions/custom-exception';

describe('OrderService', () => {
  let service: OrderService;
  const mockPrisma = {
    order: {
      create: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: PrismaService, useValue: mockPrisma }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('성공적으로 주문 생성', async () => {
      const userId = 1;
      const createOrderDto = {
        products: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      };

      mockPrisma.product.findMany.mockResolvedValue([
        { id: 1, name: '상품1', price: 1000, categoryId: 10 },
        { id: 2, name: '상품2', price: 2000, categoryId: 20 },
      ]);

      mockPrisma.order.create.mockImplementation(({ data }) => {
          return Promise.resolve({
            id: 123,
            userId: data.userId,
            trackingToken: data.trackingToken,
            totalPrice: data.totalPrice,
            status: data.status,
            orderProducts: data.orderProducts.createMany.data,
        });
      });

      const result = await service.createOrder(userId, createOrderDto);

      expect(mockPrisma.product.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: { in: [1, 2] } },
      }));

      expect(mockPrisma.order.create).toHaveBeenCalled();

      expect(result.orderProducts).toHaveLength(2);
    });

    it('상품이 존재하지 않으면 예외 발생', async () => {
      const userId = 1;
      const createOrderDto = {
        products: [{ productId: 1, quantity: 1}],
      };

      mockPrisma.product.findMany.mockResolvedValue([]);

      await expect(service.createOrder(userId, createOrderDto)).rejects.toThrow(CustomException);
    })
  })

});
