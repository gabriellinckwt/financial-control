import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { CreateInvoiceUseCase } from '../../application/use-cases/create-invoice.use-case';
import { GetInvoicesUseCase } from '../../application/use-cases/get-invoices.use-case';
import { GetInvoiceByIdUseCase } from '../../application/use-cases/get-invoice-by-id.use-case';
import { UpdateInvoiceUseCase } from '../../application/use-cases/update-invoice.use-case';
import { DeleteInvoiceUseCase } from '../../application/use-cases/delete-invoice.use-case';
import { CreateInvoiceDto } from '../../application/dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../../application/dtos/update-invoice.dto';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let createInvoiceUseCase: jest.Mocked<CreateInvoiceUseCase>;
  let getInvoicesUseCase: jest.Mocked<GetInvoicesUseCase>;
  let getInvoiceByIdUseCase: jest.Mocked<GetInvoiceByIdUseCase>;
  let updateInvoiceUseCase: jest.Mocked<UpdateInvoiceUseCase>;
  let deleteInvoiceUseCase: jest.Mocked<DeleteInvoiceUseCase>;

  beforeEach(async () => {
    const mockUseCases = {
      createInvoiceUseCase: { execute: jest.fn() },
      getInvoicesUseCase: { execute: jest.fn() },
      getInvoiceByIdUseCase: { execute: jest.fn() },
      updateInvoiceUseCase: { execute: jest.fn() },
      deleteInvoiceUseCase: { execute: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: CreateInvoiceUseCase,
          useValue: mockUseCases.createInvoiceUseCase,
        },
        {
          provide: GetInvoicesUseCase,
          useValue: mockUseCases.getInvoicesUseCase,
        },
        {
          provide: GetInvoiceByIdUseCase,
          useValue: mockUseCases.getInvoiceByIdUseCase,
        },
        {
          provide: UpdateInvoiceUseCase,
          useValue: mockUseCases.updateInvoiceUseCase,
        },
        {
          provide: DeleteInvoiceUseCase,
          useValue: mockUseCases.deleteInvoiceUseCase,
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

  describe('create', () => {
    it('should create an invoice successfully', async () => {
      const createDto: CreateInvoiceDto = {
        category: 'New Category',
        portions: 2,
        price: 200,
        title: 'New Title',
      };
      const expectedResult = { id: 1, ...createDto };

      createInvoiceUseCase.execute.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(createInvoiceUseCase.execute).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });

    it('should handle known errors', async () => {
      const createDto: CreateInvoiceDto = {
        category: 'New Category',
        portions: 2,
        price: 200,
        title: 'New Title',
      };
      const error = new Error('Known error');

      createInvoiceUseCase.execute.mockRejectedValue(error);

      await expect(controller.create(createDto)).rejects.toThrow(
        'Failed to create invoice: Known error',
      );
    });

    it('should handle unknown errors', async () => {
      const createDto: CreateInvoiceDto = {
        category: 'New Category',
        portions: 2,
        price: 200,
        title: 'New Title',
      };

      createInvoiceUseCase.execute.mockRejectedValue('Unknown error');

      await expect(controller.create(createDto)).rejects.toThrow(
        'Failed to create invoice: Unknown error',
      );
    });
  });

  describe('getAll', () => {
    it('should get all invoices successfully', async () => {
      const expectedResult = [
        {
          id: 1,
          category: 'Category',
          portions: 2,
          price: 200,
          title: 'Title',
        },
        {
          id: 2,
          category: 'Category',
          portions: 2,
          price: 200,
          title: 'Title',
        },
      ];

      getInvoicesUseCase.execute.mockResolvedValue(expectedResult);

      const result = await controller.getAll();

      expect(getInvoicesUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should handle errors', async () => {
      getInvoicesUseCase.execute.mockRejectedValue(new Error('Database error'));

      await expect(controller.getAll()).rejects.toThrow(
        'Failed to get invoices: Database error',
      );
    });
  });

  describe('getById', () => {
    it('should get invoice by id successfully', async () => {
      const id = 1;
      const expectedResult = {
        id,
        category: 'Updated Category',
        portions: 2,
        price: 200,
        title: 'Updated Title',
      };

      getInvoiceByIdUseCase.execute.mockResolvedValue(expectedResult);

      const result = await controller.getById(id);

      expect(getInvoiceByIdUseCase.execute).toHaveBeenCalledWith(id);
      expect(result).toEqual(expectedResult);
    });

    it('should handle errors', async () => {
      getInvoiceByIdUseCase.execute.mockRejectedValue(new Error('Not found'));

      await expect(controller.getById(1)).rejects.toThrow(
        'Failed to get invoice by ID: Not found',
      );
    });
  });

  describe('update', () => {
    it('should update invoice successfully', async () => {
      const updateDto: UpdateInvoiceDto = {
        id: 1,
        category: 'Updated Category',
        portions: 2,
        price: 200,
        title: 'Updated Title',
      };
      const expectedResult = { ...updateDto };

      updateInvoiceUseCase.execute.mockResolvedValue(expectedResult);

      const result = await controller.update(updateDto);

      expect(updateInvoiceUseCase.execute).toHaveBeenCalledWith(updateDto);
      expect(result).toEqual(expectedResult);
    });

    it('should handle errors', async () => {
      const updateDto: UpdateInvoiceDto = {
        id: 1,
        category: 'Updated Category',
        portions: 2,
        price: 200,
        title: 'Updated Title',
      };

      updateInvoiceUseCase.execute.mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(controller.update(updateDto)).rejects.toThrow(
        'Failed to update invoice: Update failed',
      );
    });
  });

  describe('delete', () => {
    it('should delete invoice successfully', async () => {
      const id = 1;

      deleteInvoiceUseCase.execute.mockResolvedValue(null);

      const result = await controller.delete(id);

      expect(deleteInvoiceUseCase.execute).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });

    it('should handle errors', async () => {
      deleteInvoiceUseCase.execute.mockRejectedValue(
        new Error('Delete failed'),
      );

      await expect(controller.delete(1)).rejects.toThrow(
        'Failed to delete invoice: Delete failed',
      );
    });
  });
});
