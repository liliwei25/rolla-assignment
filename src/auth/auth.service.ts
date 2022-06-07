import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResult } from './models/AuthResult';
import { Credentials } from './models/Credentials';
import { AuthInfo } from './models/AuthInfo';

const ERROR_INVALID_CREDENTIALS = 'The passed credentials are incorrect';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: Credentials): Promise<AuthResult> {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
    }
    const authInfo: AuthInfo = {
      username: user.username,
      address: user.ethAddress,
    };
    return {
      accessToken: this.jwtService.sign(authInfo),
    };
  }
}
