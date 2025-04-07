import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { CreateInvoiceUseCase } from '../../application/use-cases/create-invoice.use-case';
import { GetInvoicesUseCase } from '../../application/use-cases/get-invoices.use-case';
import { GetInvoiceByIdUseCase } from '../../application/use-cases/get-invoice-by-id.use-case';
import { UpdateInvoiceUseCase } from '../../application/use-cases/update-invoice.use-case';
import { CreateInvoiceDto } from '../../application/dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../../application/dtos/update-invoice.dto';
import { DeleteInvoiceUseCase } from '../../application/use-cases/delete-invoice.use-case';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let createInvoiceUseCase: jest.Mocked<CreateInvoiceUseCase>;
  let getInvoicesUseCase: jest.Mocked<GetInvoicesUseCase>;
  let getInvoiceByIdUseCase: jest.Mocked<GetInvoiceByIdUseCase>;
  let updateInvoiceUseCase: jest.Mocked<UpdateInvoiceUseCase>;
  let deleteInvoiceUseCase: jest.Mocked<DeleteInvoiceUseCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: CreateInvoiceUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetInvoicesUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetInvoiceByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateInvoiceUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteInvoiceUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    createInvoiceUseCase = module.get(CreateInvoiceUseCase);
    getInvoicesUseCase = module.get(GetInvoicesUseCase);
    getInvoiceByIdUseCase = module.get(GetInvoiceByIdUseCase);
    updateInvoiceUseCase = module.get(UpdateInvoiceUseCase);
    deleteInvoiceUseCase = module.get(DeleteInvoiceUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new invoice', async () => {
    const createInvoiceDto: CreateInvoiceDto = {
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedResult = { id: 1, ...createInvoiceDto };
    createInvoiceUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.create(createInvoiceDto);

    expect(createInvoiceUseCase.execute).toHaveBeenCalledWith(createInvoiceDto);
    expect(result).toEqual(expectedResult);
  });

  it('should return all invoices', async () => {
    const expectedResult = [
      { id: 1, title: '', category: '', portions: 0, price: 0 },
      { id: 2, title: '', category: '', portions: 0, price: 0 },
    ];
    getInvoicesUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.getAll();

    expect(getInvoicesUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should return a invoice by id', async () => {
    const expectedResult = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    getInvoiceByIdUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.getById(1);

    expect(getInvoiceByIdUseCase.execute).toHaveBeenCalledWith(1);
    expect(result).toEqual(expectedResult);
  });

  it('should update a invoice', async () => {
    const updateInvoiceDto: UpdateInvoiceDto = {
      id: 1,
      title: '',
      category: '',
      portions: 0,
      price: 0,
    };
    const expectedResult = { ...updateInvoiceDto, updatedAt: new Date() };
    updateInvoiceUseCase.execute.mockResolvedValue(expectedResult);

    const result = await controller.update(updateInvoiceDto);

    expect(updateInvoiceUseCase.execute).toHaveBeenCalledWith(updateInvoiceDto);
    expect(result).toEqual(expectedResult);
  });

  it('should delete a invoice', async () => {
    deleteInvoiceUseCase.execute.mockResolvedValue(null);

    const result = await controller.delete(1);

    expect(deleteInvoiceUseCase.execute).toHaveBeenCalledWith(1);
    expect(result).toEqual(null);
  });
});
