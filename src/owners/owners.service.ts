import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as moment from 'moment';
import { Owner } from './owner.model';
import { Op } from 'sequelize';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    @InjectModel(Owner)
    private readonly ownerModel: typeof Owner,
  ) {}

  create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = new Owner();
    owner.name = createOwnerDto.name;
    owner.purchaseDate = createOwnerDto.purchaseDate;

    return owner.save();
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerModel.findAll();
  }

  findOne(id: string): Promise<Owner> {
    return this.ownerModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const owner = await this.findOne(id);
    await owner.destroy();
  }

  async clearOld(): Promise<Owner[]> {
    const date = moment().subtract(18, 'M').format()
    const owners = await this.ownerModel.findAll({
      where: {
        purchaseDate: { [Op.lt]: date }
      },
    })
    await Promise.all(owners.map(owner => owner.destroy()))
    return owners
  }
}
