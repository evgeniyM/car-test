import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OwnersService } from './owners.service'
import { CreateOwnerDto } from './dto/create-owner.dto'
import { Owner } from './owner.model'

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  findAll(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ownersService.remove(id);
  }
}
