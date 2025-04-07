import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteBillUseCase {
  constructor(
    @Inject('PrismaBillRepository')
    private billRepository: PrismaBillRepository,
  ) {}

  async execute(id: number): Promise<null> {
    return this.billRepository.delete(id);
  }
}
