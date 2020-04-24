import { OwnersService } from "./owners.service"
import { Repository } from "sequelize-typescript"
import { Car } from "../cars/car.model"
import { Test, TestingModule } from "@nestjs/testing"
import { CarsModule } from "../cars/cars.module"
import { getModelToken, SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize"
import { CarOwner } from "../car-owners/car-owner.model"
import { Owner } from "./owner.model"
import { Manufacturer } from "../manufacturers/manufacturer.model"
import { CreateOwnerDto } from "./dto/create-owner.dto"


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
/**
 * Test objects
 */

const ownerDto: CreateOwnerDto = {
  name: 'name',
  purchaseDate: new Date(2018, 3, 17),
};

describe('Owner Integration Tests', () => {
  let service: OwnersService;
  let carRepo: Repository<Car>;
  let ownerRepo: Repository<Owner>;
  let carOwnerRepo: Repository<CarOwner>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CarsModule,
        SequelizeModule.forFeature([Car, CarOwner, Owner, Manufacturer]),
        SequelizeModule.forRoot(credentials),
      ],
      providers: [OwnersService],
    }).compile();

    service = module.get<OwnersService>(OwnersService);
    carRepo = module.get<Repository<Car>>(getModelToken(Car));
    ownerRepo = module.get<Repository<Owner>>(getModelToken(Owner));
    carOwnerRepo = module.get<Repository<CarOwner>>(getModelToken(CarOwner));
  });

  beforeEach(async () => {
    await clearDb([carOwnerRepo, ownerRepo, carRepo,])
  });

  describe('Add', () => {
    it('should be able to create an owner', async () => {

      const newOwner = await service.create(ownerDto);

      expect(newOwner).toMatchObject({ name: ownerDto.name });
      expect(newOwner).toBeTruthy();
    });
  });

  describe('Old', () => {
    it('should delete old owners', async () => {
      const owner1 = await ownerRepo.create(ownerDto)
      const owner2 = await ownerRepo.create({ ...ownerDto, purchaseDate: new Date()})
      await service.clearOld();
      await owner2.reload()

      expect(owner2).toBeTruthy();
      await expect(owner1.reload()).rejects.toThrow();
    });
  });

  afterAll(async () => {
    ownerRepo.sequelize.close();
  });
});

const clearDb = (repos: Repository<any>[]) => {
  return Promise.all(repos.map((repo: Repository<any>) => {
    repo.sequelize.query(`DELETE FROM ${repo.tableName}`)
  }))
}