import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma.module';
import { InvoiceModule } from './modules/invoice.module';

@Module({
  imports: [PrismaModule, InvoiceModule],
})
export class AppModule {}
