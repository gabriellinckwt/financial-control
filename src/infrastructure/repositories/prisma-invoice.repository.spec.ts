import { Test, TestingModule } from '@nestjs/testing';
import { PrismaInvoiceRepository } from './prisma-invoice.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Invoice } from '../../domain/entities/invoice.entity';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

type MockPrismaService = DeepMockProxy<PrismaService>;

describe('PrismaInvoiceRepository', () => {
  let repository: PrismaInvoiceRepository;
  let prismaService: MockPrismaService;

  beforeEach(async () => {
    const mockPrismaService = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaInvoiceRepository,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    repository = module.get<PrismaInvoiceRepository>(PrismaInvoiceRepository);
    prismaService = module.get(PrismaService) as MockPrismaService;
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a new invoice', async () => {
    const invoiceData = new Invoice(1, 'Test Invoice', 'Category', 100, 1);
    const expectedResult = {
      id: 1,
      title: 'Test Invoice',
      category: 'Category',
      price: 100,
      portions: 1,
    };

    prismaService.invoice.create.mockResolvedValue(expectedResult);

    const result = await repository.create(invoiceData);

    expect(prismaService.invoice.create).toHaveBeenCalledWith({
      data: invoiceData,
    });
    expect(result).toBeInstanceOf(Invoice);
    expect(result).toEqual(expect.objectContaining(expectedResult));
  });

  it('should throw an error if creation fails', async () => {
    const invoiceData = new Invoice(1, 'Test Invoice', 'Category', 100, 1);
    const error = new Error('Creation failed');

    prismaService.invoice.create.mockRejectedValue(error);

    await expect(repository.create(invoiceData)).rejects.toThrow(error);
  });

  it('should return all invoices', async () => {
    const expectedInvoices = [
      { id: 1, title: 'Invoice 1', category: 'Cat 1', price: 100, portions: 1 },
      { id: 2, title: 'Invoice 2', category: 'Cat 2', price: 200, portions: 2 },
    ];

    prismaService.invoice.findMany.mockResolvedValue(expectedInvoices);

    const result = await repository.getAll();

    expect(prismaService.invoice.findMany).toHaveBeenCalled();
    expect(result).toEqual(expectedInvoices);
  });

  it('should return empty array when no invoices exist', async () => {
    prismaService.invoice.findMany.mockResolvedValue([]);

    const result = await repository.getAll();

    expect(prismaService.invoice.findMany).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should throw an error if database query fails', async () => {
    const error = new Error('Database query failed');
    prismaService.invoice.findMany.mockRejectedValue(error);

    await expect(repository.getAll()).rejects.toThrow(error);
  });

  it('should return a invoice by id', async () => {
    const expectedInvoice = {
      id: 1,
      title: 'Test Invoice',
      category: 'Category',
      price: 100,
      portions: 1,
    };

    prismaService.invoice.findFirst.mockResolvedValue(expectedInvoice);

    const result = await repository.getById(1);

    expect(prismaService.invoice.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(expectedInvoice);
  });

  it('should return null when invoice is not found', async () => {
    prismaService.invoice.findFirst.mockResolvedValue(null);

    const result = await repository.getById(999);

    expect(prismaService.invoice.findFirst).toHaveBeenCalledWith({
      where: { id: 999 },
    });
    expect(result).toBeNull();
  });

  it('should handle invalid id format', async () => {
    prismaService.invoice.findFirst.mockResolvedValue(null);

    const result = await repository.getById(0);

    expect(prismaService.invoice.findFirst).toHaveBeenCalledWith({
      where: { id: 0 },
    });
    expect(result).toBeNull();
  });

  it('should throw an error if database query fails', async () => {
    const error = new Error('Database query failed');
    prismaService.invoice.findFirst.mockRejectedValue(error);

    await expect(repository.getById(1)).rejects.toThrow(error);
  });

  it('should update a invoice', async () => {
    const invoiceData = new Invoice(1, 'Updated Invoice', 'Category', 150, 2);
    const expectedResult = {
      id: 1,
      title: 'Updated Invoice',
      category: 'Category',
      price: 150,
      portions: 2,
    };

    prismaService.invoice.update.mockResolvedValue(expectedResult);

    const result = await repository.update(invoiceData);

    expect(prismaService.invoice.update).toHaveBeenCalledWith({
      data: invoiceData,
      where: { id: invoiceData.id },
    });
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error if update fails', async () => {
    const invoiceData = new Invoice(
      999,
      'Non-existent Invoice',
      'Category',
      100,
      1,
    );
    const error = new Error('Update failed');

    prismaService.invoice.update.mockRejectedValue(error);

    await expect(repository.update(invoiceData)).rejects.toThrow(error);
  });

  it('should throw an error if invoice id is not found', async () => {
    const invoiceData = new Invoice(
      999,
      'Non-existent Invoice',
      'Category',
      100,
      1,
    );
    const error = new Error('Record to update not found.');

    prismaService.invoice.update.mockRejectedValue(error);

    await expect(repository.update(invoiceData)).rejects.toThrow(error);
  });
});
