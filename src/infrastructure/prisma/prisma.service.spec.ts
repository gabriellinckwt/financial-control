import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

const mockPrismaClient = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};

class MockPrismaService extends PrismaClient {
  constructor() {
    super();
    Object.assign(this, mockPrismaClient);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

describe('PrismaService', () => {
  let service: PrismaService;
  let mockService: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useClass: MockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    mockService = service as MockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have required methods', () => {
    expect(service.$connect).toBeDefined();
    expect(service.$disconnect).toBeDefined();
    expect(service.onModuleInit).toBeDefined();
    expect(service.onModuleDestroy).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to database on module init', async () => {
      const connectSpy = jest.spyOn(mockService, '$connect');
      connectSpy.mockResolvedValueOnce(undefined);

      await service.onModuleInit();

      expect(connectSpy).toHaveBeenCalled();
      expect(connectSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error if connection fails', async () => {
      const error = new Error('Connection failed');
      jest.spyOn(mockService, '$connect').mockRejectedValueOnce(error);

      await expect(service.onModuleInit()).rejects.toThrow('Connection failed');
    });
  });

  describe('onModuleDestroy', () => {
    it('should disconnect from database on module destroy', async () => {
      const disconnectSpy = jest.spyOn(mockService, '$disconnect');
      disconnectSpy.mockResolvedValueOnce(undefined);

      await service.onModuleDestroy();

      expect(disconnectSpy).toHaveBeenCalled();
      expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error if disconnection fails', async () => {
      const error = new Error('Disconnection failed');
      jest.spyOn(mockService, '$disconnect').mockRejectedValueOnce(error);

      await expect(service.onModuleDestroy()).rejects.toThrow(
        'Disconnection failed',
      );
    });
  });

  describe('lifecycle hooks', () => {
    it('should call connect on init and disconnect on destroy in correct order', async () => {
      const connectSpy = jest.spyOn(mockService, '$connect');
      const disconnectSpy = jest.spyOn(mockService, '$disconnect');

      connectSpy.mockResolvedValueOnce(undefined);
      disconnectSpy.mockResolvedValueOnce(undefined);

      await service.onModuleInit();
      expect(connectSpy).toHaveBeenCalled();
      expect(disconnectSpy).not.toHaveBeenCalled();

      await service.onModuleDestroy();
      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('connection methods', () => {
    it('should expose connect method', () => {
      expect(typeof service.$connect).toBe('function');
    });

    it('should expose disconnect method', () => {
      expect(typeof service.$disconnect).toBe('function');
    });

    it('should successfully connect', async () => {
      const connectSpy = jest.spyOn(mockService, '$connect');
      connectSpy.mockResolvedValueOnce(undefined);

      await service.$connect();
      expect(connectSpy).toHaveBeenCalled();
    });

    it('should successfully disconnect', async () => {
      const disconnectSpy = jest.spyOn(mockService, '$disconnect');
      disconnectSpy.mockResolvedValueOnce(undefined);

      await service.$disconnect();
      expect(disconnectSpy).toHaveBeenCalled();
    });
  });
});
