import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.req.dto';
import { OrderResponseDto } from './dto/order.res.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';
import { v4 as uuidv4 } from 'uuid';

interface Order {
  id: number;
  product: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private generateTrackingToken(): string {
    return crypto.randomUUID();
  }
  
  constructor(private readonly prisma: PrismaService) {};

  // 주문 생성
  async createOrder(
    userId: number | null,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const productIds = createOrderDto.products.map(p => p.productId);
    const trackingToken = userId ? null : this.generateTrackingToken();


    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        categoryId: true
      },
    });

    const productMap = new Map(products.map(p => [p.id, p]));

    let totalPrice = 0;
    const orderProductsData: Prisma.OrderProductCreateManyOrderInput[] = [];

    for (const item of createOrderDto.products) {
      const product = productMap.get(item.productId);

      if (!product) {
        throw new CustomException(EXCEPTION_STATUS.PRODUCT.NOT_FOUND);
      }

      const itemPrice = product.price * item.quantity;
      totalPrice = totalPrice += itemPrice;

      orderProductsData.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtOrder: product.price,
        productNameAtOrder: product.name,
      });
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        trackingToken,
        totalPrice: totalPrice,
        status: 'PENDING',
        orderProducts: {
          createMany: {
            data: orderProductsData,
          },
        },
      },
      include: { orderProducts: true },
    });

    return order;
  }


  async findMemberOrders(userId: number): Promise<OrderResponseDto[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: { orderProducts: true },
    });
  }

  async findNonMemberOrder(trackingToken: string): Promise<OrderResponseDto | null> {
    const order = await this.prisma.order.findFirst({
      where: { trackingToken },
      include: { orderProducts: true },
    });
    return order;
  }
}