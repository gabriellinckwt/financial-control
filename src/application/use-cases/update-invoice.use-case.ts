import { Inject, Injectable } from '@nestjs/common';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';
import { Invoice } from '../../domain/entities/invoice.entity';
import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';

@Injectable()
export class UpdateInvoiceUseCase {
  constructor(
    @Inject('PrismaInvoiceRepository')
    private invoiceRepository: PrismaInvoiceRepository,
  ) {}

  async execute(data: UpdateInvoiceDto): Promise<Invoice> {
    return await this.invoiceRepository.update(data);
  }
}
