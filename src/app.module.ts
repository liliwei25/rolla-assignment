import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    Web3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
