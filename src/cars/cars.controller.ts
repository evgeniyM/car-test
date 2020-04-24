import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Car } from './car.model'
import { CarsService } from './cars.service'
import { CreateCarDto } from './dto/create-car.dto'
import { Manufacturer } from '../manufacturers/manufacturer.model'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.carsService.remove(id);
  }

  @Get(':id/manufacturer')
  manufacturer(@Param('id') id: string): Promise<Manufacturer> {
    return this.carsService.manufacturer(id);
  }
}
