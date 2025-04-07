export class UpdateBillDto {
  constructor(
    public id: number,
    public title: string,
    public category: string,
    public price: number,
    public portions: number,
  ) {}
}
