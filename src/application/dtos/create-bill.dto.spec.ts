import { CreateBillDto } from './create-bill.dto';

describe('CreateBillDto', () => {
  it('should create a DTO with provided values', () => {
    const dto = new CreateBillDto('Test Bill', 'Utilities', 100, 1);

    expect(dto).toEqual({
      title: 'Test Bill',
      category: 'Utilities',
      price: 100,
      portions: 1,
    });
  });

  it('should have all required properties', () => {
    const dto = new CreateBillDto('Test', 'Category', 100, 1);

    const properties = Object.keys(dto);

    expect(properties).toContain('title');
    expect(properties).toContain('category');
    expect(properties).toContain('price');
    expect(properties).toContain('portions');
    expect(properties.length).toBe(4); // Garante que só existem estas propriedades
  });

  it('should maintain correct types for properties', () => {
    const dto = new CreateBillDto('Test', 'Category', 99.99, 3);

    expect(typeof dto.title).toBe('string');
    expect(typeof dto.category).toBe('string');
    expect(typeof dto.price).toBe('number');
    expect(typeof dto.portions).toBe('number');
  });

  it('should allow property updates', () => {
    const dto = new CreateBillDto('Initial', 'Category', 100, 1);

    dto.title = 'New Title';
    dto.category = 'New Category';
    dto.price = 150;
    dto.portions = 2;

    expect(dto).toEqual({
      title: 'New Title',
      category: 'New Category',
      price: 150,
      portions: 2,
    });
  });
});
