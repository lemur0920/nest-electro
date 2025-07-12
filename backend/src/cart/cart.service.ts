import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CartResponseDto } from './dto/cart.res.dto';
import { CreateCartDto, CreateCartItemDto } from './dto/create-cart.req.dto';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';
import { randomUUID } from 'crypto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(private prisma: PrismaService){};

  async mergeGuestCartToUser(guestSessionToken: string, userId: number): Promise<void> {
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

    for (const item of guestCart.cartItems) {
      await this.prisma.cartItem.upsert({
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
      });
    }

    await this.prisma.cart.delete({
      where: { id: guestCart.id },
    });
  }

  async createCart(
    userId: number | null,
    sessionToken?: string | null,
    items: CreateCartItemDto[],
  ): Promise<CartResponseDto> {
    if (!userId && !sessionToken) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.SESSION_TOKEN_MISSING_ERROR);
    }


    const cart = await this.prisma.cart.create({
      data: {
        userId,
        sessionToken: sessionToken || `GUEST-${randomUUID()}`,
        cartItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            userId: userId,
            
          })),
        },
      },
      include: { cartItems: true },
  });

    return cart;
  }
}
