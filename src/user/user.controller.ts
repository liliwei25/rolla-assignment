import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  ConflictException,
  BadRequestException,
  UsePipes,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateInput } from './models/UserCreateInput';
import { UserResponse } from './models/UserResponse';
import { Web3Service } from '../web3/web3.service';
import { JwtGuard } from '../auth/jwt.guard';
import { TokenValidationPipe } from '../pipes/token-validation.pipe';
import {Token} from "../web3/TokenEnum";

const ERROR_USER_ALREADY_EXISTS = 'User already exists';
const ERROR_MISSING_CREATE_PARAMS = 'Missing username or password';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private web3Service: Web3Service,
  ) {}

  @Post('create')
  async createUser(@Body() input: UserCreateInput): Promise<UserResponse> {
    if (!input?.username || !input?.password) {
      throw new BadRequestException(ERROR_MISSING_CREATE_PARAMS);
    }
    const user = await this.userService.findUser({ username: input.username });
    if (user) {
      throw new ConflictException(ERROR_USER_ALREADY_EXISTS);
    }
    const { address } = this.web3Service.createAccount();
    return this.userService.createUser({ ...input, ethAddress: address });
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getUser(@Request() req): Promise<UserResponse> {
    return req.user;
  }

  @UseGuards(JwtGuard)
  @UsePipes(TokenValidationPipe)
  @Get('balance/:token')
  async getUserBalance(@Request() req, @Param() token: Token): Promise<string> {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.web3Service.getBalance(req.user.ethAddress, token);
  }
}
