import { Body, Controller, Get, Logger, ParseArrayPipe, Post, Query, Session } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.req.dto';
import { OrderResponseDto } from './dto/order.res.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';

@ApiTags('orders') // Swagger 태그
@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {};

  @ApiOperation({ summary: '주문생성' })
  @Post()
  async createOrder(
    @Session() session: Record<string, any>,
    @Body() createOrderDto: CreateOrderDto,
  ):Promise<ResponseDto<OrderResponseDto>> {
    const userId = session.userId ?? null;
    const newOrder = await this.orderService.createOrder(userId, createOrderDto);
    return ResponseDto.success({
      message: '주문 등록 성공',
      data: newOrder
    }); 
  }

  @Get()
  async findMemberOrders(
    @Session() session: Record<string, any>
    ): Promise<OrderResponseDto[]> {
      const userId = session.userId;
      if (!userId) throw new CustomException(EXCEPTION_STATUS.AUTH.UNAUTHENTICATED);
      return this.orderService.findMemberOrders(userId);
    }

  @Get('non-member')
  async findNonMemberOrder(
    @Query('token') trackingToken: string
  ): Promise<OrderResponseDto | null> {
    return this.orderService.findNonMemberOrder(trackingToken);
  }

}
