import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CartResponseDto } from './dto/cart.res.dto';
import { CreateCartDto, CreateCartItemDto } from './dto/create-cart.req.dto';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';
import { randomUUID } from 'crypto';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(private prisma: PrismaService){};

  async mergeGuestCartToUser(guestSessionToken: string, userId: number): Promise<CartResponseDto> {
    const guestCart = await this.prisma.cart.findUnique({
      where: { sessionToken: guestSessionToken },
      include: { cartItems: true },
    });

    if (!guestCart) return;

    let userCart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!userCart) {
      userCart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }
    
    const operations = [
      ...guestCart.cartItems.map(item =>
        this.prisma.cartItem.upsert({
          where: {
            cartId_productId: {
              cartId: userCart.id,
              productId: item.productId,
            },
          },
          update: {
            quantity: { increment: item.quantity },
            price: item.price,
            categoryId: item.categoryId,
          },
          create: {
            cartId: userCart.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            categoryId: item.categoryId,
          },
        })
      ),
      this.prisma.cartItem.deleteMany({
        where: { cartId: guestCart.id },
      }),
      this.prisma.cart.delete({
        where: { id: guestCart.id },
      }),
    ];
    await this.prisma.$transaction(operations);
  }

  async createCart(
    createCartDto: CreateCartDto,
    userId: number | null,
    sessionToken?: string | null,
  ): Promise<CartResponseDto> {
    if (!userId && !sessionToken) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.SESSION_TOKEN_MISSING_ERROR);
    }


    const cart = await this.prisma.cart.create({
    data: {
      userId,
      sessionToken: sessionToken || `GUEST-${randomUUID()}`,
      cartItems: {
        create: createCartDto.cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          categoryId: item.categoryId,
        })),
      },
    },
    include: { cartItems: true },
  });

  const totalPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  
  return {
    ...cart,
    totalPrice
    };
  }

  async getCart(sessionToken?: string, userId?: number) {
    if (userId) {
      const userCart = await this.prisma.cart.findUnique({
        where: { userId },
      });
      return userCart
    }

    if (sessionToken) {
      const guestCart = await this.prisma.cart.findUnique({
        where: { sessionToken },
        include: { cartItems: true },
      });
      return guestCart;
    }
    throw new CustomException(EXCEPTION_STATUS.CART.NOT_FOUND);
  }
}
