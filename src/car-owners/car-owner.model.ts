import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Car } from '../cars/car.model'
import { Owner } from '../owners/owner.model'

@Table({
  timestamps: false,
})
export class CarOwner extends Model<CarOwner> {

  @ForeignKey(() => Car)
  @Column
  carId: number;

  @ForeignKey(() => Owner)
  @Column
  ownerId: number;
}
