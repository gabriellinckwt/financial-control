import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BillRepository } from '../../domain/repositories/bill-repository.interface';
import { Bill } from '../../domain/entities/bill.entity';
import { CreateBillDto } from '../dtos/create-bill.dto';
import { UpdateBillDto } from '../dtos/update-bill.dto';

@Injectable()
export class PrismaBillRepository implements BillRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBillDto): Promise<Bill> {
    const bill = await this.prisma.bill.create({
      data,
    });

    return new Bill(
      bill.id,
      bill.title,
      bill.category,
      bill.price,
      bill.portions,
    );
  }

  async getAll(): Promise<Bill[]> {
    const bills = await this.prisma.bill.findMany();
    return bills;
  }

  async getById(id: string): Promise<Bill | null> {
    const bill = await this.prisma.bill.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    return bill;
  }

  async update(data: UpdateBillDto): Promise<Bill> {
    const { id } = data;

    const bill = await this.prisma.bill.update({
      data,
      where: {
        id,
      },
    });

    return bill;
  }

  async delete(id: string): Promise<null> {
    await this.prisma.bill.delete({
      where: {
        id: parseInt(id),
      },
    });

    return null;
  }
}
