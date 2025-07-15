import { Body, Controller, Logger, Post, Request, Session } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.req.dto';
import { CartResponseDto } from './dto/cart.res.dto';
import { randomUUID } from 'crypto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  private readonly logger = new Logger(CartController.name);
  constructor(private readonly cartService: CartService) {};
  

  @Post()
  @ApiOperation({ summary: '장바구니 생성' })
  @Serialize(CartResponseDto)
  async createCart(
    @Body() createCartDto: CreateCartDto,
    @Session() session: Record<string, any>,
  ): Promise<ResponseDto<CartResponseDto>> {
    const userId = session.userId || null;
    const sessionToken = userId ? undefined : session.sessionToken || (session.sessionToken = `GUEST-${randomUUID()}`);
    const newCart = await this.cartService.createCart(createCartDto, userId, sessionToken);
    
    return ResponseDto.success({
      message: '장바구니 생성 성공',
      data: newCart
    });
  }
}[]
