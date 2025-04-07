import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { BillModule } from './modules/bill.module';

@Module({
  imports: [PrismaModule, BillModule],
})
export class AppModule {}
