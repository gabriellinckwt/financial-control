import { Test, TestingModule } from '@nestjs/testing';
import { GetBillsUseCase } from './get-bills.use-case';
import { Bill } from '../../domain/entities/bill.entity';
import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';

describe('GetBillsUseCase', () => {
  let useCase: GetBillsUseCase;
  let mockBillRepository: jest.Mocked<PrismaBillRepository>;

  beforeEach(async () => {
    mockBillRepository = {
      getAll: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBillsUseCase,
        {
          provide: 'PrismaBillRepository',
          useValue: mockBillRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetBillsUseCase>(GetBillsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should get all bills', async () => {
    const expectedBills: Bill[] = [
      { id: 1, title: '', category: '', portions: 0, price: 0 },
      { id: 2, title: '', category: '', portions: 0, price: 0 },
    ];

    mockBillRepository.getAll.mockResolvedValue(expectedBills);

    const result = await useCase.execute();

    expect(mockBillRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(expectedBills);
  });

  it('should return an empty array if no bills are found', async () => {
    mockBillRepository.getAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(mockBillRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
