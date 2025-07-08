import { Injectable } from '@nestjs/common';

interface Order {
  id: number;
  product: string;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
}

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private idCounter = 1;

  // 주문 생성
  createOrder(product: string, amount: number): Order {
    
  }
}
