import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResult } from './models/AuthResult';
import { Credentials } from './models/Credentials';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: Credentials): Promise<AuthResult> {
    if (!body?.username || !body.password) {
      throw new BadRequestException('Username or password missing');
    }
    return this.authService.login(body);
  }
}
