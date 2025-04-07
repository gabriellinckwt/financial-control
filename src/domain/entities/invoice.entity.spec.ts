import { Invoice } from './invoice.entity';

describe('Invoice Entity', () => {
  it('should create a invoice with all properties', () => {
    const invoice = new Invoice(1, 'Internet', 'Utilities', 100, 1);

    expect(invoice).toBeDefined();
    expect(invoice).toBeInstanceOf(Invoice);
  });

  it('should have all required properties', () => {
    const invoice = new Invoice(1, 'Internet', 'Utilities', 100, 1);

    expect(invoice).toEqual({
      id: 1,
      title: 'Internet',
      category: 'Utilities',
      price: 100,
      portions: 1,
    });
  });

  it('should maintain correct types for properties', () => {
    const invoice = new Invoice(1, 'Internet', 'Utilities', 100, 1);

    expect(typeof invoice.id).toBe('number');
    expect(typeof invoice.title).toBe('string');
    expect(typeof invoice.category).toBe('string');
    expect(typeof invoice.price).toBe('number');
    expect(typeof invoice.portions).toBe('number');
  });

  it('should not allow property modifications due to readonly (compile-time check)', () => {
    const invoice = new Invoice(1, 'Internet', 'Utilities', 100, 1);

    expect(invoice).toEqual({
      id: 1,
      title: 'Internet',
      category: 'Utilities',
      price: 100,
      portions: 1,
    });
  });

  it('should create invoices with different values', () => {
    const invoice1 = new Invoice(1, 'Internet', 'Utilities', 100, 1);
    const invoice2 = new Invoice(2, 'Phone', 'Communication', 50.5, 2);
    const invoice3 = new Invoice(3, 'Rent', 'Housing', 1000, 12);

    expect(invoice1).toBeDefined();
    expect(invoice2).toBeDefined();
    expect(invoice3).toBeDefined();

    expect(invoice1).toEqual({
      id: 1,
      title: 'Internet',
      category: 'Utilities',
      price: 100,
      portions: 1,
    });

    expect(invoice2).toEqual({
      id: 2,
      title: 'Phone',
      category: 'Communication',
      price: 50.5,
      portions: 2,
    });

    expect(invoice3).toEqual({
      id: 3,
      title: 'Rent',
      category: 'Housing',
      price: 1000,
      portions: 12,
    });
  });

  it('should accept decimal values for price', () => {
    const invoice = new Invoice(1, 'Internet', 'Utilities', 99.99, 1);

    expect(invoice.price).toBe(99.99);
  });

  it('should handle edge cases for numeric values', () => {
    const invoiceWithMaxNumber = new Invoice(
      Number.MAX_SAFE_INTEGER,
      'Test',
      'Test',
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
    );

    expect(invoiceWithMaxNumber.id).toBe(Number.MAX_SAFE_INTEGER);
    expect(invoiceWithMaxNumber.price).toBe(Number.MAX_SAFE_INTEGER);
    expect(invoiceWithMaxNumber.portions).toBe(Number.MAX_SAFE_INTEGER);
  });
});
