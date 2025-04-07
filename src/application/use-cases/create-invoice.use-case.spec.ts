import { Test, TestingModule } from '@nestjs/testing';
import { CreateInvoiceUseCase } from './create-invoice.use-case';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { Invoice } from '../../domain/entities/invoice.entity';
import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';

describe('CreateInvoiceUseCase', () => {
  let useCase: CreateInvoiceUseCase;
  let mockInvoiceRepository: jest.Mocked<PrismaInvoiceRepository>;

  beforeEach(async () => {
    mockInvoiceRepository = {
      create: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInvoiceUseCase,
        {
          provide: 'PrismaInvoiceRepository',
          useValue: mockInvoiceRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateInvoiceUseCase>(CreateInvoiceUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a invoice', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedInvoice: Invoice = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };

    mockInvoiceRepository.create.mockResolvedValue(expectedInvoice);

    const result = await useCase.execute(createInvoiceDto);

    expect(mockInvoiceRepository.create).toHaveBeenCalledWith(createInvoiceDto);
    expect(result).toEqual(expectedInvoice);
  });
});
