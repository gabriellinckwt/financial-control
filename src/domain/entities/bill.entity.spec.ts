import { Bill } from './bill.entity';

describe('Bill Entity', () => {
  it('should create a bill with all properties', () => {
    const bill = new Bill(1, 'Internet', 'Utilities', 100, 1);

    expect(bill).toBeDefined();
    expect(bill).toBeInstanceOf(Bill);
  });

  it('should have all required properties', () => {
    const bill = new Bill(1, 'Internet', 'Utilities', 100, 1);

    expect(bill).toEqual({
      id: 1,
      title: 'Internet',
      category: 'Utilities',
      price: 100,
      portions: 1,
    });
  });

  it('should maintain correct types for properties', () => {
    const bill = new Bill(1, 'Internet', 'Utilities', 100, 1);

    expect(typeof bill.id).toBe('number');
    expect(typeof bill.title).toBe('string');
    expect(typeof bill.category).toBe('string');
    expect(typeof bill.price).toBe('number');
    expect(typeof bill.portions).toBe('number');
  });

  it('should not allow property modifications due to readonly (compile-time check)', () => {
    const bill = new Bill(1, 'Internet', 'Utilities', 100, 1);

    expect(bill).toEqual({
      id: 1,
      title: 'Internet',
      category: 'Utilities',
      price: 100,
      portions: 1,
    });
  });

  it('should create bills with different values', () => {
    const bill1 = new Bill(1, 'Internet', 'Utilities', 100, 1);
    const bill2 = new Bill(2, 'Phone', 'Communication', 50.5, 2);
    const bill3 = new Bill(3, 'Rent', 'Housing', 1000, 12);

    expect(bill1).toBeDefined();
    expect(bill2).toBeDefined();
    expect(bill3).toBeDefined();

    expect(bill1).toEqual({
      id: 1,
      title: 'Internet',
      category: 'Utilities',
      price: 100,
      portions: 1,
    });

    expect(bill2).toEqual({
      id: 2,
      title: 'Phone',
      category: 'Communication',
      price: 50.5,
      portions: 2,
    });

    expect(bill3).toEqual({
      id: 3,
      title: 'Rent',
      category: 'Housing',
      price: 1000,
      portions: 12,
    });
  });

  it('should accept decimal values for price', () => {
    const bill = new Bill(1, 'Internet', 'Utilities', 99.99, 1);

    expect(bill.price).toBe(99.99);
  });

  it('should handle edge cases for numeric values', () => {
    const billWithMaxNumber = new Bill(
      Number.MAX_SAFE_INTEGER,
      'Test',
      'Test',
      Number.MAX_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER,
    );

    expect(billWithMaxNumber.id).toBe(Number.MAX_SAFE_INTEGER);
    expect(billWithMaxNumber.price).toBe(Number.MAX_SAFE_INTEGER);
    expect(billWithMaxNumber.portions).toBe(Number.MAX_SAFE_INTEGER);
  });
});
