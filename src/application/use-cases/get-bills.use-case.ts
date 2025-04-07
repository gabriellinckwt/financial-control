import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Bill } from '../../domain/entities/bill.entity';

@Injectable()
export class GetBillsUseCase {
  constructor(
    @Inject('PrismaBillRepository')
    private billRepository: PrismaBillRepository,
  ) {}

  async execute(): Promise<Bill[]> {
    return this.billRepository.getAll();
  }
}
