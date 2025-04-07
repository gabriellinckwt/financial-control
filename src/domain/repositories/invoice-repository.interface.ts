import { Invoice } from '../entities/invoice.entity';
import { CreateInvoiceDto } from 'src/application/dtos/create-invoice.dto';
import { UpdateInvoiceDto } from 'src/application/dtos/update-invoice.dto';

export interface InvoiceRepository {
  create(data: CreateInvoiceDto): Promise<Invoice>;
  getAll(): Promise<Invoice[]>;
  getById(id: number): Promise<Invoice | null>;
  update(data: UpdateInvoiceDto): Promise<Invoice>;
  delete(id: number): Promise<null>;
}
