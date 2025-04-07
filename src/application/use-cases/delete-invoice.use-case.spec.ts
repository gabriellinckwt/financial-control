import { Test, TestingModule } from '@nestjs/testing';
import { DeleteInvoiceUseCase } from './delete-invoice.use-case';
import { PrismaInvoiceRepository } from '../../infrastructure/repositories/prisma-invoice.repository';

describe('DeleteInvoiceUseCase', () => {
  let useCase: DeleteInvoiceUseCase;
  let mockInvoiceRepository: jest.Mocked<PrismaInvoiceRepository>;

  beforeEach(async () => {
    mockInvoiceRepository = {
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteInvoiceUseCase,
        {
          provide: 'PrismaInvoiceRepository',
          useValue: mockInvoiceRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteInvoiceUseCase>(DeleteInvoiceUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a invoice', async () => {
    mockInvoiceRepository.delete.mockResolvedValue(null);

    const result = await useCase.execute(1);

    expect(mockInvoiceRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toBeNull();
  });
});
