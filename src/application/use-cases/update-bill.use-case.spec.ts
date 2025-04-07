import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBillUseCase } from './update-bill.use-case';
import { UpdateBillDto } from '../dtos/update-bill.dto';
import { Bill } from '../../domain/entities/bill.entity';
import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';

describe('UpdateBillUseCase', () => {
  let useCase: UpdateBillUseCase;
  let mockBillRepository: jest.Mocked<PrismaBillRepository>;

  beforeEach(async () => {
    mockBillRepository = {
      update: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBillUseCase,
        {
          provide: 'PrismaBillRepository',
          useValue: mockBillRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateBillUseCase>(UpdateBillUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a bill', async () => {
    const updateBillDto: UpdateBillDto = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedUpdatedBill: Bill = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };

    mockBillRepository.update.mockResolvedValue(expectedUpdatedBill);

    const result = await useCase.execute(updateBillDto);

    expect(mockBillRepository.update).toHaveBeenCalledWith(updateBillDto);
    expect(result).toEqual(expectedUpdatedBill);
  });
});
