import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.req.dto';
import { CartResponseDto } from './dto/cart.res.dto';

@Controller('cart')
export class CartController {
  private readonly logger = new Logger(CartController.name);
  constructor(private readonly cartService: CartService) {};
  
  @Post()
  async createCart(@Body() createCartDto: CreateCartDto): Promise<CartResponseDto> {
    const { userId, sessionToken, items } = createCartDto

    return await this.cartService.createCart(userId, sesionToken, items);
  }
}
