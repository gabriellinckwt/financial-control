import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Bill } from '../../domain/entities/bill.entity';

@Injectable()
export class GetBillByIdUseCase {
  constructor(
    @Inject('PrismaBillRepository')
    private billRepository: PrismaBillRepository,
  ) {}

  async execute(id: string): Promise<Bill | null> {
    return this.billRepository.getById(id);
  }
}
