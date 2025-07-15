import { Body, Controller, HttpCode, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.req.dto';
import { CartService } from 'src/cart/cart.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ApiOperation } from '@nestjs/swagger';

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

  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  async logout(@Session() session: Record<string, any>): Promise<ResponseDto<void>> {
    session.userId = undefined; // 세션에서 사용자 정보 제거

    return ResponseDto.success({message:'로그아웃 성공'});
  }
}
