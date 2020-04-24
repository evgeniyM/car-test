import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Car } from '../cars/car.model'

@Table
export class Manufacturer extends Model<Manufacturer> {
  @Column
  name: string;

  @Column
  phone: string;

  @Column
  siret: number;

  @HasMany(() => Car)
  cars: Car[];
}