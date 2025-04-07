import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteInvoiceUseCase {
  constructor(
    @Inject('PrismaInvoiceRepository')
    private invoiceRepository: PrismaInvoiceRepository,
  ) {}

  async execute(id: number): Promise<null> {
    return this.invoiceRepository.delete(id);
  }
}
