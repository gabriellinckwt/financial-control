import { Test, TestingModule } from '@nestjs/testing';
import { GetInvoiceByIdUseCase } from './get-invoice-by-id.use-case';
import { Invoice } from '../../domain/entities/invoice.entity';
import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';

describe('GetInvoiceByIdUseCase', () => {
  let useCase: GetInvoiceByIdUseCase;
  let mockInvoiceRepository: jest.Mocked<PrismaInvoiceRepository>;

  beforeEach(async () => {
    mockInvoiceRepository = {
      getById: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetInvoiceByIdUseCase,
        {
          provide: 'PrismaInvoiceRepository',
          useValue: mockInvoiceRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetInvoiceByIdUseCase>(GetInvoiceByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should get a invoice by id', async () => {
    const id = 1;
    const expectedInvoice: Invoice = {
      id,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };

    mockInvoiceRepository.getById.mockResolvedValue(expectedInvoice);

    const result = await useCase.execute(1);

    expect(mockInvoiceRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(expectedInvoice);
  });

  it('should return null if invoice is not found', async () => {
    const id = 2;

    mockInvoiceRepository.getById.mockResolvedValue(null);

    const result = await useCase.execute(id);

    expect(mockInvoiceRepository.getById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });
});
