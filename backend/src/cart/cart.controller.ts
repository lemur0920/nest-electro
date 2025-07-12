import { Body, Controller, Logger, Post, Request, Session } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.req.dto';
import { CartResponseDto } from './dto/cart.res.dto';
import { Session } from 'inspector/promises';
import { randomUUID } from 'crypto';

@Controller('cart')
export class CartController {
  private readonly logger = new Logger(CartController.name);
  constructor(private readonly cartService: CartService) {};
  
  @Post()
  async createCart(
    @Body() createCartDto: CreateCartDto,
    @Session() session: Record<string, any>,
  ): Promise<CartResponseDto> {
    const userId = session.userId || null;
    const sessionToken = userId ? undefined : session.sessionToken || (session.sessionToken = `GUEST-${randomUUID()}`);
    
    return await this.cartService.createCart(userId, sessionToken, createCartDto.items);
  }
}[]
