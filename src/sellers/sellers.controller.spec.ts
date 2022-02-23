import { Test, TestingModule } from '@nestjs/testing';
import { SellersController } from './sellers.controller';

describe('VendorsController', () => {
  let controller: SellersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellersController],
      providers: [],
    }).compile();

    controller = module.get<SellersController>(SellersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
