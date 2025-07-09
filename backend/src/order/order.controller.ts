import { Body, Controller, Logger, Post, Session } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.req.dto';
import { OrderResponseDto } from './dto/order.res.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders') // Swagger 태그
@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {};

  @ApiOperation({ summary: '주문생성' })
  @Post()
  async createOrder(
    @Session() session: Record<string, any>,
    @Body() createOrderDto: CreateOrderDto
  ):Promise<ResponseDto<OrderResponseDto>> {
    const userId = session.userId ?? null;
    const newOrder = await this.orderService.createOrder(userId, createOrderDto);
    return ResponseDto.success({
      message: '주문 등록 성공',
      data: newOrder
    }); 
  }
}
