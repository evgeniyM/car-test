import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service'
import { Manufacturer } from './manufacturer.model'
import { CreateManufacturerDto } from './dto/create-manufacturer.dto'

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer> {
    return this.manufacturersService.create(createManufacturerDto);
  }

  @Get()
  findAll(): Promise<Manufacturer[]> {
    return this.manufacturersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Manufacturer> {
    return this.manufacturersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.manufacturersService.remove(id);
  }
}
