export class CreateInvoiceDto {
  constructor(
    public title: string,
    public category: string,
    public price: number,
    public portions: number,
  ) {}
}
