import { Module } from '@nestjs/common';
import { PrismaBillRepository } from 'src/infrastructure/repositories/prisma-bill.repository';
import { PrismaModule } from './prisma.module';
import { BillController } from '../presentation/controllers/bill.controller';
import { CreateBillUseCase } from '../application/use-cases/create-bill.use-case';
import { GetBillsUseCase } from '../application/use-cases/get-bills.use-case';
import { GetBillByIdUseCase } from '../application/use-cases/get-bill-by-id.use-case';
import { UpdateBillUseCase } from '../application/use-cases/update-bill.use-case';
import { DeleteBillUseCase } from '@/application/use-cases/delete-bill.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [BillController],
  providers: [
    PrismaBillRepository,
    {
      provide: 'PrismaBillRepository',
      useClass: PrismaBillRepository,
    },
    CreateBillUseCase,
    GetBillsUseCase,
    GetBillByIdUseCase,
    UpdateBillUseCase,
    DeleteBillUseCase,
  ],
  exports: [
    'PrismaBillRepository',
    CreateBillUseCase,
    GetBillsUseCase,
    GetBillByIdUseCase,
    UpdateBillUseCase,
    DeleteBillUseCase,
  ],
})
export class BillModule {}
