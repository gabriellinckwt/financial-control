import { Test, TestingModule } from '@nestjs/testing';
import { DeleteBillUseCase } from './delete-bill.use-case';
import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';

describe('DeleteBillUseCase', () => {
  let useCase: DeleteBillUseCase;
  let mockBillRepository: jest.Mocked<PrismaBillRepository>;

  beforeEach(async () => {
    mockBillRepository = {
      delete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteBillUseCase,
        {
          provide: 'PrismaBillRepository',
          useValue: mockBillRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteBillUseCase>(DeleteBillUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a bill', async () => {
    mockBillRepository.delete.mockResolvedValue(null);

    const result = await useCase.execute('1');

    expect(mockBillRepository.delete).toHaveBeenCalledWith('1');
    expect(result).toBeNull();
  });
});
