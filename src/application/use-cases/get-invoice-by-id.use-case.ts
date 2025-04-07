import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Invoice } from '../../domain/entities/invoice.entity';

@Injectable()
export class GetInvoiceByIdUseCase {
  constructor(
    @Inject('PrismaInvoiceRepository')
    private invoiceRepository: PrismaInvoiceRepository,
  ) {}

  async execute(id: number): Promise<Invoice | null> {
    return this.invoiceRepository.getById(id);
  }
}
