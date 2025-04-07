import { Test, TestingModule } from '@nestjs/testing';
import { CreateBillUseCase } from './create-bill.use-case';
import { CreateBillDto } from '../dtos/create-bill.dto';
import { Bill } from '../../domain/entities/bill.entity';
import { PrismaBillRepository } from '../../infrastructure/repositories/prisma-bill.repository';

describe('CreateBillUseCase', () => {
  let useCase: CreateBillUseCase;
  let mockBillRepository: jest.Mocked<PrismaBillRepository>;

  beforeEach(async () => {
    mockBillRepository = {
      create: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBillUseCase,
        {
          provide: 'PrismaBillRepository',
          useValue: mockBillRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateBillUseCase>(CreateBillUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a bill', async () => {
    const createBillDto: CreateBillDto = {
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedBill: Bill = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };

    mockBillRepository.create.mockResolvedValue(expectedBill);

    const result = await useCase.execute(createBillDto);

    expect(mockBillRepository.create).toHaveBeenCalledWith(createBillDto);
    expect(result).toEqual(expectedBill);
  });
});
