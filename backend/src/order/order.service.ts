import { Injectable } from '@nestjs/common';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.req.dto';
import { OrderResponseDto } from './dto/order.res.dto';
import { PrismaService } from 'prisma/prisma.service';

interface Order {
  id: number;
  product: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {};

  // 주문 생성
  async createOrder(userId: number, dto: CreateOrderDto): Promise<OrderResponseDto> {
    const order = await this.prisma.order.create({
      data: {
        userId: userId,
        orderProducts: {
          create: dto.products.map((p) => ({
            userId: userId,
            productId: p.productId,
            categoryId: p.categoryId,
            quantity: p.quantity
          })),
        },
      },
      include: { orderProducts: true },
    });

    return order;
  }

  async findAll(): Promise<OrderResponseDto[]> {
    const orders = await this.prisma.order.findMany({
      include: { orderProducts: true },
    });
    return orders;
  }
}
