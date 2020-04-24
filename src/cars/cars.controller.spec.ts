import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service'
import { Car } from './car.model'

describe('Cars Controller', () => {
  let controller: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService,{
        provide: CarsService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([
            { price: 100, firstRegistartionDate: new Date(2020,2,2) },
            { price: 50, firstRegistartionDate: new Date(2019,4,2) },
            { price: 70, firstRegistartionDate: new Date(2018,2,2) },
          ]),
        },
      }],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
    controller = module.get<CarsController>(CarsController);
  });

  describe('findAll', () => {
    it('should get an array of cats', () => {
      expect(controller.findAll()).resolves.toEqual([
        { price: 100, firstRegistartionDate: new Date(2020,2,2) },
        { price: 50, firstRegistartionDate: new Date(2019,4,2) },
        { price: 70, firstRegistartionDate: new Date(2018,2,2) },
      ]);
    });
  });
});
