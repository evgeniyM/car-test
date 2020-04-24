import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CarsModule } from '../src/cars/cars.module';
import { CarsService } from '../src/cars/cars.service';

describe('CarsController (e2e)', () => {
  let app: INestApplication;
  let carsService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CarsModule],
      providers: [CarsService]
    })
      .overrideProvider(CarsService)
      .useValue(carsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/cars')
      .expect(200)
      .expect(carsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
