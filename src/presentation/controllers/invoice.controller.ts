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
    try {
      return await this.createInvoiceUseCase.execute(createInvoiceDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create invoice: ${error.message}`);
      }
      throw new Error('Failed to create invoice: Unknown error');
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.getInvoicesUseCase.execute();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get invoices: ${error.message}`);
      }
      throw new Error('Failed to get invoices: Unknown error');
    }
  }

  @Get(':id')
  @UseGuards(ParseIdGuard)
  async getById(@Param('id') id: number) {
    try {
      return await this.getInvoiceByIdUseCase.execute(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get invoice by ID: ${error.message}`);
      }
      throw new Error('Failed to get invoice by ID: Unknown error');
    }
  }

  @Put()
  async update(@Body() updateInvoiceDto: UpdateInvoiceDto) {
    try {
      return await this.updateInvoiceUseCase.execute(updateInvoiceDto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update invoice: ${error.message}`);
      }
      throw new Error('Failed to update invoice: Unknown error');
    }
  }

  @Delete(':id')
  @UseGuards(ParseIdGuard)
  async delete(@Param('id') id: number) {
    try {
      return await this.deleteInvoiceUseCase.execute(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete invoice: ${error.message}`);
      }
      throw new Error('Failed to delete invoice: Unknown error');
    }
  }
}
