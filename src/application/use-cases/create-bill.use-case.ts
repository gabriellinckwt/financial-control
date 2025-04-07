import { Inject, Injectable } from '@nestjs/common';
import { CreateBillDto } from '../dtos/create-bill.dto';
import { Bill } from '../../domain/entities/bill.entity';
import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';

@Injectable()
export class CreateBillUseCase {
  constructor(
    @Inject('PrismaBillRepository')
    private prismaBillRepository: PrismaBillRepository,
  ) {}

  async execute(data: CreateBillDto): Promise<Bill> {
    return this.prismaBillRepository.create(data);
  }
}
