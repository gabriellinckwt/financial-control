import { Test, TestingModule } from '@nestjs/testing';
import { GetInvoicesUseCase } from './get-invoices.use-case';
import { Invoice } from '../../domain/entities/invoice.entity';
import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';

describe('GetInvoicesUseCase', () => {
  let useCase: GetInvoicesUseCase;
  let mockInvoiceRepository: jest.Mocked<PrismaInvoiceRepository>;

  beforeEach(async () => {
    mockInvoiceRepository = {
      getAll: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetInvoicesUseCase,
        {
          provide: 'PrismaInvoiceRepository',
          useValue: mockInvoiceRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetInvoicesUseCase>(GetInvoicesUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should get all invoices', async () => {
    const expectedInvoices: Invoice[] = [
      { id: 1, title: '', category: '', portions: 0, price: 0 },
      { id: 2, title: '', category: '', portions: 0, price: 0 },
    ];

    mockInvoiceRepository.getAll.mockResolvedValue(expectedInvoices);

    const result = await useCase.execute();

    expect(mockInvoiceRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(expectedInvoices);
  });

  it('should return an empty array if no invoices are found', async () => {
    mockInvoiceRepository.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(mockInvoiceRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
