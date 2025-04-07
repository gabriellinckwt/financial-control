import { Test, TestingModule } from '@nestjs/testing';
import { GetBillByIdUseCase } from './get-bill-by-id.use-case';
import { Bill } from '../../domain/entities/bill.entity';
import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';

describe('GetBillByIdUseCase', () => {
  let useCase: GetBillByIdUseCase;
  let mockBillRepository: jest.Mocked<PrismaBillRepository>;

  beforeEach(async () => {
    mockBillRepository = {
      getById: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBillByIdUseCase,
        {
          provide: 'PrismaBillRepository',
          useValue: mockBillRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetBillByIdUseCase>(GetBillByIdUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should get a bill by id', async () => {
    const id = 1;
    const expectedBill: Bill = {
      id,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };

    mockBillRepository.getById.mockResolvedValue(expectedBill);

    const result = await useCase.execute('1');

    expect(mockBillRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual(expectedBill);
  });

  it('should return null if bill is not found', async () => {
    const id = 'non-existent-id';

    mockBillRepository.getById.mockResolvedValue(null);

    const result = await useCase.execute(id);

    expect(mockBillRepository.getById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });
});
