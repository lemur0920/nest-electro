import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CartResponseDto } from './dto/cart.res.dto';
import { CreateCartDto } from './dto/create-cart.req.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(private prisma: PrismaService){};

  async createCart(
    userId?: number,
    sessionToken?: string,
    items: CreateCartDto[],
  ): Promise<CartResponseDto> {
    
  }
}
