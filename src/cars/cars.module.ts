import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { SequelizeModule } from '@nestjs/sequelize'
import { Car } from './car.model'
import { Manufacturer } from '../manufacturers/manufacturer.model'

@Module({
  imports: [SequelizeModule.forFeature([Car, Manufacturer])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}