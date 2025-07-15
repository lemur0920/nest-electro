import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [UserModule, CartModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
