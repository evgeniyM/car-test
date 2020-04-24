import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Car } from '../cars/car.model'
import { CarOwner } from '../car-owners/car-owner.model'

@Table
export class Owner extends Model<Owner> {
  @Column
  name: string;

  @Column
  purchaseDate: Date;

  @BelongsToMany(() => Car, () => CarOwner)
  cars: Car[];
}