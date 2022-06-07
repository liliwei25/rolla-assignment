import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { PasswordService } from '../auth/password.service';
import { UserResponse } from './models/UserResponse';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user ? UserService.getUserResponseFromUser(user) : user;
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      return UserService.getUserResponseFromUser(user);
    }
    return null;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserResponse> {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: await this.passwordService.hash(data.password),
      },
    });
    return UserService.getUserResponseFromUser(user);
  }

  /**
   * Used to remove password from user
   * TODO
   * Should update after this issue is released
   * https://github.com/prisma/prisma/issues/5042
   */
  private static getUserResponseFromUser({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password,
    ...user
  }: User): UserResponse {
    return user;
  }
}
