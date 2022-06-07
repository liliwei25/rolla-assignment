import { Token } from '@prisma/client';

export interface AddBalanceInput {
  token: Token;
  amount: number;
}
