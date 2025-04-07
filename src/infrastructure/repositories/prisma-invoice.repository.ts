import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvoiceRepository } from '../../domain/repositories/invoice-repository.interface';
import { Invoice } from '../../domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';

@Injectable()
export class PrismaInvoiceRepository implements InvoiceRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInvoiceDto): Promise<Invoice> {
    const invoice = await this.prisma.invoice.create({
      data,
    });

    return new Invoice(
      invoice.id,
      invoice.title,
      invoice.category,
      invoice.price,
      invoice.portions,
    );
  }

  async getAll(): Promise<Invoice[]> {
    const invoices = await this.prisma.invoice.findMany();
    return invoices;
  }

  async getById(id: number): Promise<Invoice | null> {
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        id,
      },
    });

    return invoice;
  }

  async update(data: UpdateInvoiceDto): Promise<Invoice> {
    const { id } = data;

    const invoice = await this.prisma.invoice.update({
      data,
      where: {
        id,
      },
    });

    return invoice;
  }

  async delete(id: number): Promise<null> {
    await this.prisma.invoice.delete({
      where: {
        id,
      },
    });

    return null;
  }
}
