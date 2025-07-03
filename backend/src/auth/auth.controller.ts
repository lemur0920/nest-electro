import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.req.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>
  ) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (user) {
      session.userId = user.id;
    }
    return user;
  }
}
