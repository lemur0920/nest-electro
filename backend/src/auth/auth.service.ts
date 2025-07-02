import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.INVALID_CREDENTIALS);
    }

    const { password: _, ...result } = user;
    return result;
  }
}
