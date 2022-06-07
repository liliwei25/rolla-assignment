import { Token } from '@prisma/client';

export interface TokenBalance {
  token: Token;
  balance: number;
}
