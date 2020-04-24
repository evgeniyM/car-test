import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as moment from 'moment';
import { Car } from './car.model';
import { CreateCarDto } from './dto/create-car.dto'
import { Manufacturer } from '../manufacturers/manufacturer.model'

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car)
    @InjectModel(Manufacturer)
    private readonly carModel: typeof Car,
  ) {}

  create(createCarDto: CreateCarDto): Promise<Car> {
    const car = new Car();
    car.price = createCarDto.price;
    car.firstRegistartionDate = createCarDto.firstRegistartionDate;
    car.manufacturerId = createCarDto.manufacturerId;

    return car.save();
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.findAll();
  }

  findOne(id: string): Promise<Car> {
    return this.carModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const car = await this.findOne(id);
    await car.destroy();
  }

  async manufacturer(id: string): Promise<Manufacturer> {
    const car = await this.carModel.findOne({
      where: {
        id,
      },
      include: [Manufacturer]
    })
    if(car) {
      return car.manufacturer
    }
  }

  async discount(): Promise<Car[]> {
    const start = moment().subtract(18, 'M').format()
    const end = moment().subtract(12, 'M').format()
    const cars = await this.carModel.findAll({
      where: {
        firstRegistartionDate: { [Op.between]: [start, end] },
      },
    })
    return Promise.all(cars.map(car => car.update({ price: car.price - car.price * 0.2 })))
  }
}
