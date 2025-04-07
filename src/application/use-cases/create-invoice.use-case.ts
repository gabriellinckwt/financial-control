import { Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { Invoice } from '../../domain/entities/invoice.entity';
import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject('PrismaInvoiceRepository')
    private prismaInvoiceRepository: PrismaInvoiceRepository,
  ) {}

  async execute(data: CreateInvoiceDto): Promise<Invoice> {
    return this.prismaInvoiceRepository.create(data);
  }
}
