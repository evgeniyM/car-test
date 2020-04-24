import { CarsService } from "./cars.service"
import { Repository } from "sequelize-typescript"
import { Car } from "./car.model"
import { Test, TestingModule } from "@nestjs/testing"
import { CarsModule } from "./cars.module"
import { getModelToken, SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize"
import { CreateCarDto } from "./dto/create-car.dto"
import { CarOwner } from "../car-owners/car-owner.model"
import { Owner } from "../owners/owner.model"
import { Manufacturer } from "../manufacturers/manufacturer.model"
import { CreateManufacturerDto } from "../manufacturers/dto/create-manufacturer.dto"


const credentials: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 13306,
  username: 'root',
  password: 'root',
  database: 'test',
  autoLoadModels: true,
  synchronize: true,
}

const carDto: CreateCarDto = {
  price: 50,
  firstRegistartionDate: new Date(2019, 3, 17),
  manufacturerId: null,
};

const manufacturerDto: CreateManufacturerDto = {
  name: 'name',
  phone: '111-22-33',
  siret: 123,
};

describe('Car Integration Tests', () => {
  let service: CarsService;
  let carRepo: Repository<Car>;
  let manufacturerRepo: Repository<Manufacturer>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CarsModule,
        SequelizeModule.forFeature([Car, CarOwner, Owner, Manufacturer]),
        SequelizeModule.forRoot(credentials),
      ],
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
    carRepo = module.get<Repository<Car>>(getModelToken(Car));
    manufacturerRepo = module.get<Repository<Manufacturer>>(getModelToken(Manufacturer));
  });

  beforeEach(async () => {
    await clearDb([carRepo, manufacturerRepo])
  });

  describe('Add', () => {
    it('should be able to create a car', async () => {
      // create new car
      const newCar = await service.create(carDto);

      expect(newCar).toMatchObject({ price: carDto.price });
      expect(newCar).toBeTruthy();
    });
  });

  describe('Get manufacturer', () => {
    it('should return car mahufacturer', async () => {
      const manufacturer = await manufacturerRepo.create(manufacturerDto)
      const car = await carRepo.create({ ...carDto, manufacturerId: manufacturer.id })
      const result = await service.manufacturer(car.id);

      expect(result).toBeTruthy();
      expect(result).toMatchObject({ name: manufacturerDto.name });
    });

    it('should return null', async () => {
      const car = await carRepo.create(carDto)
      const result = await service.manufacturer(car.id);

      expect(result).toBeFalsy();
    });
  });

  describe('Discount', () => {
    it('should recalculate car price', async () => {
      const car1 = await carRepo.create(carDto)
      const car2 = await carRepo.create({ ...carDto, firstRegistartionDate: new Date() })
      await service.discount();
      await car1.reload()
      await car2.reload()

      expect(car1.price).toEqual(carDto.price - carDto.price * 0.2);
      expect(car2.price).toEqual(carDto.price);
    });
  });

  afterAll(async () => {
    carRepo.sequelize.close();
  });
});

const clearDb = (repos: Repository<any>[]) => {
  return Promise.all(repos.map((repo: Repository<any>) => {
    repo.sequelize.query(`DELETE FROM ${repo.tableName}`)
  }))
}