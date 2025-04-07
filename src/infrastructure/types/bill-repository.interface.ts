import { Bill } from 'src/domain/entities/bill.entity';

export interface BillRepository {
  create(bill: Omit<Bill, 'id'>): Promise<Bill>;
  getAll(): Promise<Bill[]>;
  getById(id: string): Promise<Bill>;
  update(data: Bill): Promise<Bill>;
  delete(id: string): Promise<null>;
}
