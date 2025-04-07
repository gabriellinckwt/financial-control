import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Invoice } from '../../domain/entities/invoice.entity';

@Injectable()
export class GetInvoicesUseCase {
  constructor(
    @Inject('PrismaInvoiceRepository')
    private invoiceRepository: PrismaInvoiceRepository,
  ) {}

  async execute(): Promise<Invoice[]> {
    return this.invoiceRepository.getAll();
  }
}
