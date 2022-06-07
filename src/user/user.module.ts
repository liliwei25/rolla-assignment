import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordService } from '../auth/password.service';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [Web3Module],
  providers: [UserService, PasswordService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
