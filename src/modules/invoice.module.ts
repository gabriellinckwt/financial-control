import { Module } from '@nestjs/common';
import { PrismaInvoiceRepository } from '../infrastructure/repositories/prisma-invoice.repository';
import { PrismaModule } from './prisma.module';
import { InvoiceController } from '../presentation/controllers/invoice.controller';
import { CreateInvoiceUseCase } from '../application/use-cases/create-invoice.use-case';
import { GetInvoicesUseCase } from '../application/use-cases/get-invoices.use-case';
import { GetInvoiceByIdUseCase } from '../application/use-cases/get-invoice-by-id.use-case';
import { UpdateInvoiceUseCase } from '../application/use-cases/update-invoice.use-case';
import { DeleteInvoiceUseCase } from '../application/use-cases/delete-invoice.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [InvoiceController],
  providers: [
    PrismaInvoiceRepository,
    {
      provide: 'PrismaInvoiceRepository',
      useClass: PrismaInvoiceRepository,
    },
    CreateInvoiceUseCase,
    GetInvoicesUseCase,
    GetInvoiceByIdUseCase,
    UpdateInvoiceUseCase,
    DeleteInvoiceUseCase,
  ],
  exports: [
    'PrismaInvoiceRepository',
    CreateInvoiceUseCase,
    GetInvoicesUseCase,
    GetInvoiceByIdUseCase,
    UpdateInvoiceUseCase,
    DeleteInvoiceUseCase,
  ],
})
export class InvoiceModule {}
