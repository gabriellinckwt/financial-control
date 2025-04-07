import { Invoice } from 'src/domain/entities/invoice.entity';

export interface InvoiceRepository {
  create(invoice: Omit<Invoice, 'id'>): Promise<Invoice>;
  getAll(): Promise<Invoice[]>;
  getById(id: string): Promise<Invoice>;
  update(data: Invoice): Promise<Invoice>;
  delete(id: string): Promise<null>;
}
