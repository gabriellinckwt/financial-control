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
import { CreateBillDto } from '../../application/dtos/create-bill.dto';
import { UpdateBillDto } from '../../application/dtos/update-bill.dto';
import { CreateBillUseCase } from '../../application/use-cases/create-bill.use-case';
import { GetBillByIdUseCase } from '../../application/use-cases/get-bill-by-id.use-case';
import { GetBillsUseCase } from '../../application/use-cases/get-bills.use-case';
import { UpdateBillUseCase } from '../../application/use-cases/update-bill.use-case';
import { DeleteBillUseCase } from '../../application/use-cases/delete-bill.use-case';
import { ParseIdGuard } from '../../gateways/guards/parse-number.guard';

@Controller('api/v1/bill')
export class BillController {
  constructor(
    private createBillUseCase: CreateBillUseCase,
    private getBillsUseCase: GetBillsUseCase,
    private getBillByIdUseCase: GetBillByIdUseCase,
    private updateBillUseCase: UpdateBillUseCase,
    private deleteBillUseCase: DeleteBillUseCase,
  ) {}

  @Post()
  async create(@Body() createBillDto: CreateBillDto) {
    return this.createBillUseCase.execute(createBillDto);
  }

  @Get()
  async getAll() {
    return this.getBillsUseCase.execute();
  }

  @Get(':id')
  @UseGuards(ParseIdGuard)
  async getById(@Param('id') id: number) {
    return this.getBillByIdUseCase.execute(id);
  }

  @Put()
  async update(@Body() updateBillDto: UpdateBillDto) {
    return this.updateBillUseCase.execute(updateBillDto);
  }

  @Delete(':id')
  @UseGuards(ParseIdGuard)
  async delete(@Param('id') id: number) {
    return this.deleteBillUseCase.execute(id);
  }
}
