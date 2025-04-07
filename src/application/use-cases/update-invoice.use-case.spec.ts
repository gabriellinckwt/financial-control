import { Test, TestingModule } from '@nestjs/testing';
import { UpdateInvoiceUseCase } from './update-invoice.use-case';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';
import { Invoice } from '../../domain/entities/invoice.entity';
import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';

describe('UpdateInvoiceUseCase', () => {
  let useCase: UpdateInvoiceUseCase;
  let mockInvoiceRepository: jest.Mocked<PrismaInvoiceRepository>;

  beforeEach(async () => {
    mockInvoiceRepository = {
      update: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateInvoiceUseCase,
        {
          provide: 'PrismaInvoiceRepository',
          useValue: mockInvoiceRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateInvoiceUseCase>(UpdateInvoiceUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a invoice', async () => {
    const updateInvoiceDto: UpdateInvoiceDto = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedUpdatedInvoice: Invoice = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };

    mockInvoiceRepository.update.mockResolvedValue(expectedUpdatedInvoice);

    const result = await useCase.execute(updateInvoiceDto);

    expect(mockInvoiceRepository.update).toHaveBeenCalledWith(updateInvoiceDto);
    expect(result).toEqual(expectedUpdatedInvoice);
  });
});
