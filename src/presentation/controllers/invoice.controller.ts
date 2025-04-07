import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateInvoiceDto } from '../../application/dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../../application/dtos/update-invoice.dto';
import { CreateInvoiceUseCase } from '../../application/use-cases/create-invoice.use-case';
import { GetInvoiceByIdUseCase } from '../../application/use-cases/get-invoice-by-id.use-case';
import { GetInvoicesUseCase } from '../../application/use-cases/get-invoices.use-case';
import { UpdateInvoiceUseCase } from '../../application/use-cases/update-invoice.use-case';
import { DeleteInvoiceUseCase } from '../../application/use-cases/delete-invoice.use-case';
import { ParseIdGuard } from '../../gateways/guards/parse-number.guard';

@Controller('api/v1/invoice')
export class InvoiceController {
  constructor(
    private createInvoiceUseCase: CreateInvoiceUseCase,
    private getInvoicesUseCase: GetInvoicesUseCase,
    private getInvoiceByIdUseCase: GetInvoiceByIdUseCase,
    private updateInvoiceUseCase: UpdateInvoiceUseCase,
    private deleteInvoiceUseCase: DeleteInvoiceUseCase,
  ) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.createInvoiceUseCase.execute(createInvoiceDto);
  }

  @Get()
  async getAll() {
    return this.getInvoicesUseCase.execute();
  }

  @Get(':id')
  @UseGuards(ParseIdGuard)
  async getById(@Param('id') id: number) {
    return this.getInvoiceByIdUseCase.execute(id);
  }

  @Put()
  async update(@Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.updateInvoiceUseCase.execute(updateInvoiceDto);
  }

  @Delete(':id')
  @UseGuards(ParseIdGuard)
  async delete(@Param('id') id: number) {
    return this.deleteInvoiceUseCase.execute(id);
  }
}
