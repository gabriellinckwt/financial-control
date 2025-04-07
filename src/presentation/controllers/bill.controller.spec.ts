import { Test, TestingModule } from '@nestjs/testing';
import { BillController } from './bill.controller';
import { CreateBillUseCase } from '../../application/use-cases/create-bill.use-case';
import { GetBillsUseCase } from '../../application/use-cases/get-bills.use-case';
import { GetBillByIdUseCase } from '../../application/use-cases/get-bill-by-id.use-case';
import { UpdateBillUseCase } from '../../application/use-cases/update-bill.use-case';
import { CreateBillDto } from '../../application/dtos/create-bill.dto';
import { UpdateBillDto } from '../../application/dtos/update-bill.dto';
import { DeleteBillUseCase } from '../../application/use-cases/delete-bill.use-case';

describe('BillController', () => {
  let controller: BillController;
  let createBillUseCase: jest.Mocked<CreateBillUseCase>;
  let getBillsUseCase: jest.Mocked<GetBillsUseCase>;
  let getBillByIdUseCase: jest.Mocked<GetBillByIdUseCase>;
  let updateBillUseCase: jest.Mocked<UpdateBillUseCase>;
  let deleteBillUseCase: jest.Mocked<DeleteBillUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillController],
      providers: [
        {
          provide: CreateBillUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetBillsUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetBillByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateBillUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteBillUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<BillController>(BillController);
    createBillUseCase = module.get(CreateBillUseCase);
    getBillsUseCase = module.get(GetBillsUseCase);
    getBillByIdUseCase = module.get(GetBillByIdUseCase);
    updateBillUseCase = module.get(UpdateBillUseCase);
    deleteBillUseCase = module.get(DeleteBillUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new bill', async () => {
    const createBillDto: CreateBillDto = {
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedResult = { id: 1, ...createBillDto };
    createBillUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.create(createBillDto);

    expect(createBillUseCase.execute).toHaveBeenCalledWith(createBillDto);
    expect(result).toEqual(expectedResult);
  });

  it('should return all bills', async () => {
    const expectedResult = [
      { id: 1, title: '', category: '', portions: 0, price: 0 },
      { id: 2, title: '', category: '', portions: 0, price: 0 },
    ];
    getBillsUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.getAll();

    expect(getBillsUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should return a bill by id', async () => {
    const expectedResult = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    getBillByIdUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.getById(1);

    expect(getBillByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(result).toEqual(expectedResult);
  });

  it('should update a bill', async () => {
    const updateBillDto: UpdateBillDto = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedResult = { ...updateBillDto, updatedAt: new Date() };
    updateBillUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.update(updateBillDto);

    expect(updateBillUseCase.execute).toHaveBeenCalledWith(updateBillDto);
    expect(result).toEqual(expectedResult);
  });

  it('should delete a bill', async () => {
    deleteBillUseCase.execute.mockResolvedValue(null);

    const result = await controller.delete(1);

    expect(deleteBillUseCase.execute).toHaveBeenCalledWith(1);
    expect(result).toEqual(null);
  });
});
