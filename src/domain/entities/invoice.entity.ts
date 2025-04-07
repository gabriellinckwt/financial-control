export class Invoice {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly category: string,
    public readonly price: number,
    public readonly portions: number,
  ) {}
}
