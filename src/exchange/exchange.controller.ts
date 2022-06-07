import {
  Controller,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
  Param,
  UsePipes,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { ExchangeService } from './exchange.service';
import { TokenBalance } from './models/TokenBalance';
import { Token } from '@prisma/client';
import { TokenValidationPipe } from '../pipes/token-validation.pipe';
import { AddBalanceInput } from './models/AddBalanceInput';

const ERROR_DEPOSIT_INPUT_INVALID = 'Amount or token not specified';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @UseGuards(JwtGuard)
  @UsePipes(TokenValidationPipe)
  @Get('balance/:token')
  async getUserBalance(
    @Request() req,
    @Param() token: Token,
  ): Promise<TokenBalance> {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.exchangeService.getBalance(req.user.ethAddress, token);
  }

  @UseGuards(JwtGuard)
  @UsePipes(TokenValidationPipe)
  @Post('deposit')
  async deposit(
    @Request() req,
    @Body() body: AddBalanceInput,
  ): Promise<TokenBalance> {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    if (!body?.token || typeof body?.amount === 'undefined') {
      throw new BadRequestException(ERROR_DEPOSIT_INPUT_INVALID);
    }
    return this.exchangeService.addToBalance(req.user.ethAddress, body);
  }
}
