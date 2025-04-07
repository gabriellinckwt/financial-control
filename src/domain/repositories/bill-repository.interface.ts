import { Bill } from '../entities/bill.entity';
import { CreateBillDto } from 'src/application/dtos/create-bill.dto';
import { UpdateBillDto } from 'src/application/dtos/update-bill.dto';

export interface BillRepository {
  create(data: CreateBillDto): Promise<Bill>;
  getAll(): Promise<Bill[]>;
  getById(id: number): Promise<Bill | null>;
  update(data: UpdateBillDto): Promise<Bill>;
  delete(id: number): Promise<null>;
}
