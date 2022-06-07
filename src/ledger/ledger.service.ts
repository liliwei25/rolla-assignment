import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, Ledger } from '@prisma/client';

@Injectable()
export class LedgerService {
  constructor(private prisma: PrismaService) {}

  async addToLedger(data: Prisma.LedgerCreateInput): Promise<Ledger> {
    return this.prisma.ledger.create({
      data,
    });
  }

  async findLatestLedgerEntry(
    findInput: Prisma.LedgerWhereInput,
  ): Promise<Ledger | null> {
    return this.prisma.ledger.findFirst({
      where: findInput,
      orderBy: {
        id: 'desc',
      },
    });
  }
}
