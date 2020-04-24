import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { Manufacturer } from './manufacturer.model'
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersController } from './manufacturers.controller';

@Module({
  imports: [SequelizeModule.forFeature([Manufacturer])],
  providers: [ManufacturersService],
  controllers: [ManufacturersController],
})
export class ManufacturersModule {}
