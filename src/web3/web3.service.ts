import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Account } from 'web3-core';
import { ConfigService } from '@nestjs/config';

const WEB_3_PROVIDER_KEY = 'WEB_3_PROVIDER';

@Injectable()
export class Web3Service {
  web3Instance: Web3;

  constructor(private configService: ConfigService) {
    this.web3Instance = new Web3(
      configService.getOrThrow<string>(WEB_3_PROVIDER_KEY),
    );
  }

  createAccount(): Account {
    return this.web3Instance.eth.accounts.create();
  }
}
