import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { CarOwner } from './car-owner.model'

@Module({
  imports: [SequelizeModule.forFeature([CarOwner])],
})
export class CarOwnersModule {}
