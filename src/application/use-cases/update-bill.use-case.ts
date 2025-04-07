import { Inject, Injectable } from '@nestjs/common';
import { UpdateBillDto } from '../dtos/update-bill.dto';
import { Bill } from '../../domain/entities/bill.entity';
import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';

@Injectable()
export class UpdateBillUseCase {
  constructor(
    @Inject('PrismaBillRepository')
    private billRepository: PrismaBillRepository,
  ) {}

  async execute(data: UpdateBillDto): Promise<Bill> {
    return await this.billRepository.update(data);
  }
}
