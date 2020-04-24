import { Column, Model, Table, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Owner } from '../owners/owner.model'
import { Manufacturer } from '../manufacturers/manufacturer.model'
import { CarOwner } from '../car-owners/car-owner.model'

@Table
export class Car extends Model<Car> {
  @Column
  price: number;

  @Column
  firstRegistartionDate: Date;

  @ForeignKey(() => Manufacturer)
  @Column
  manufacturerId: number;

  @BelongsTo(() => Manufacturer)
  manufacturer: Manufacturer;

  @BelongsToMany(() => Owner, () => CarOwner)
  owners: Owner[];
}
