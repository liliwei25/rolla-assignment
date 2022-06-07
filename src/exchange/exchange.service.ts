import { Injectable } from '@nestjs/common';
import { Token } from '@prisma/client';
import { LedgerService } from '../ledger/ledger.service';
import { TokenBalance } from './models/TokenBalance';
import { AddBalanceInput } from './models/AddBalanceInput';

@Injectable()
export class ExchangeService {
  constructor(private ledgerService: LedgerService) {}

  async getBalance(
    userEthAddress: string,
    token: Token,
  ): Promise<TokenBalance> {
    const latestLedgerEntry = await this.ledgerService.findLatestLedgerEntry({
      userEthAddress,
      token,
    });
    return {
      token,
      balance: latestLedgerEntry?.balance.toNumber() ?? 0,
    };
  }

  async addToBalance(
    ethAddress: string,
    { token, amount }: AddBalanceInput,
  ): Promise<TokenBalance> {
    const { balance } = await this.getBalance(ethAddress, token);
    const { balance: updatedBalance } = await this.ledgerService.addToLedger({
      user: { connect: { ethAddress } },
      token,
      amount,
      balance: balance + amount,
    });
    return {
      token,
      balance: updatedBalance.toNumber(),
    };
  }
}
