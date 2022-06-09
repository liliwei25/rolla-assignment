import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Account } from 'web3-core';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { Token } from './TokenEnum';
import Web3 from 'web3';

const WEB_3_PROVIDER_KEY = 'WEB_3_PROVIDER';

const tokenContractAddresses = {
  [Token.USDC]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
};

@Injectable()
export class Web3Service {
  providerUrl: string;
  web3Instance: Web3;

  constructor(private configService: ConfigService) {
    this.providerUrl = configService.getOrThrow<string>(WEB_3_PROVIDER_KEY);
    this.web3Instance = new Web3(this.providerUrl);
  }

  createAccount(): Account {
    return this.web3Instance.eth.accounts.create();
  }

  async getBalance(address: string, token: Token): Promise<string> {
    const balance = await (token === Token.ETHEREUM
      ? this.web3Instance.eth.getBalance(address)
      : this.getTokenBalance(address, token));
    return this.web3Instance.utils.fromWei(balance);
  }

  private async getTokenBalance(address, token) {
    const raw = JSON.stringify({
      jsonrpc: '2.0',
      method: 'alchemy_getTokenBalances',
      headers: {
        'Content-Type': 'application/json',
      },
      params: [address, [tokenContractAddresses[token]]],
    });

    const result = await fetch(this.providerUrl, {
      method: 'POST',
      body: raw,
      redirect: 'follow',
    });

    if (!result.ok) {
      throw new InternalServerErrorException(
        'Unable to retrieve balance: ' + (await result.text()),
      );
    }
    const data = await result.json();

    return data.result.tokenBalances[0].tokenBalance;
  }
}
