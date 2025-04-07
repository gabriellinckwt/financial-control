import { Test, TestingModule } from '@nestjs/testing';
import { PrismaBillRepository } from './prisma-bill.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Bill } from '../../domain/entities/bill.entity';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

type MockPrismaService = DeepMockProxy<PrismaService>;

describe('PrismaBillRepository', () => {
  let repository: PrismaBillRepository;
  let prismaService: MockPrismaService;

  beforeEach(async () => {
    const mockPrismaService = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaBillRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<PrismaBillRepository>(PrismaBillRepository);
    prismaService = module.get(PrismaService) as MockPrismaService;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a new bill', async () => {
    const billData = new Bill(1, 'Test Bill', 'Category', 100, 1);
    const expectedResult = {
      id: 1,
      title: 'Test Bill',
      category: 'Category',
      price: 100,
      portions: 1,
    };

    prismaService.bill.create.mockResolvedValue(expectedResult);

    const result = await repository.create(billData);

    expect(prismaService.bill.create).toHaveBeenCalledWith({
      data: billData,
    });
    expect(result).toBeInstanceOf(Bill);
    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('should throw an error if creation fails', async () => {
    const billData = new Bill(1, 'Test Bill', 'Category', 100, 1);
    const error = new Error('Creation failed');

    prismaService.bill.create.mockRejectedValue(error);

    await expect(repository.create(billData)).rejects.toThrow(error);
  });

  it('should return all bills', async () => {
    const expectedBills = [
      { id: 1, title: 'Bill 1', category: 'Cat 1', price: 100, portions: 1 },
      { id: 2, title: 'Bill 2', category: 'Cat 2', price: 200, portions: 2 },
    ];

    prismaService.bill.findMany.mockResolvedValue(expectedBills);

    const result = await repository.getAll();

    expect(prismaService.bill.findMany).toHaveBeenCalled();
    expect(result).toEqual(expectedBills);
  });

  it('should return empty array when no bills exist', async () => {
    prismaService.bill.findMany.mockResolvedValue([]);

    const result = await repository.getAll();

    expect(prismaService.bill.findMany).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should throw an error if database query fails', async () => {
    const error = new Error('Database query failed');
    prismaService.bill.findMany.mockRejectedValue(error);

    await expect(repository.getAll()).rejects.toThrow(error);
  });

  it('should return a bill by id', async () => {
    const expectedBill = {
      id: 1,
      title: 'Test Bill',
      category: 'Category',
      price: 100,
      portions: 1,
    };

    prismaService.bill.findFirst.mockResolvedValue(expectedBill);

    const result = await repository.getById(1);

    expect(prismaService.bill.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(expectedBill);
  });

  it('should return null when bill is not found', async () => {
    prismaService.bill.findFirst.mockResolvedValue(null);

    const result = await repository.getById(999);

    expect(prismaService.bill.findFirst).toHaveBeenCalledWith({
      where: { id: 999 },
    });
    expect(result).toBeNull();
  });

  it('should handle invalid id format', async () => {
    prismaService.bill.findFirst.mockResolvedValue(null);

    const result = await repository.getById(0);

    expect(prismaService.bill.findFirst).toHaveBeenCalledWith({
      where: { id: 0 },
    });
    expect(result).toBeNull();
  });

  it('should throw an error if database query fails', async () => {
    const error = new Error('Database query failed');
    prismaService.bill.findFirst.mockRejectedValue(error);

    await expect(repository.getById(1)).rejects.toThrow(error);
  });

  it('should update a bill', async () => {
    const billData = new Bill(1, 'Updated Bill', 'Category', 150, 2);
    const expectedResult = {
      id: 1,
      title: 'Updated Bill',
      category: 'Category',
      price: 150,
      portions: 2,
    };

    prismaService.bill.update.mockResolvedValue(expectedResult);

    const result = await repository.update(billData);

    expect(prismaService.bill.update).toHaveBeenCalledWith({
      data: billData,
      where: { id: billData.id },
    });
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error if update fails', async () => {
    const billData = new Bill(999, 'Non-existent Bill', 'Category', 100, 1);
    const error = new Error('Update failed');

    prismaService.bill.update.mockRejectedValue(error);

    await expect(repository.update(billData)).rejects.toThrow(error);
  });

  it('should throw an error if bill id is not found', async () => {
    const billData = new Bill(999, 'Non-existent Bill', 'Category', 100, 1);
    const error = new Error('Record to update not found.');

    prismaService.bill.update.mockRejectedValue(error);

    await expect(repository.update(billData)).rejects.toThrow(error);
  });
});
