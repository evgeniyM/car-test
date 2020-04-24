import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Manufacturer } from './manufacturer.model'
import { CreateManufacturerDto } from './dto/create-manufacturer.dto'

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectModel(Manufacturer)
    private readonly manufacturerModel: typeof Manufacturer,
  ) {}

  create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer> {
    const manufacturer = new Manufacturer();
    manufacturer.name = createManufacturerDto.name;
    manufacturer.phone = createManufacturerDto.phone;
    manufacturer.siret = createManufacturerDto.siret;

    return manufacturer.save();
  }

  async findAll(): Promise<Manufacturer[]> {
    return this.manufacturerModel.findAll();
  }

  findOne(id: string): Promise<Manufacturer> {
    return this.manufacturerModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const manufacturer = await this.findOne(id);
    await manufacturer.destroy();
  }

}
