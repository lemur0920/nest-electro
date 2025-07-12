import { Body, Controller, HttpCode, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.req.dto';
import { CartService } from 'src/cart/cart.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cartService: CartService
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>
  ) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (user) {
      session.userId = user.id;
    }

    const guestSessionToken = session.sessionToken;

    if (guestSessionToken) {
      await this.cartService.mergeGuestCartToUser(session.sessionToken, user.id);
      session.sessionToken = null;
    }
    return user;
  }
}
