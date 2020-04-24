import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { Owner } from './owner.model'
import { OwnersService } from './owners.service'
import { OwnersController } from './owners.controller';

@Module({
  imports: [SequelizeModule.forFeature([Owner])],
  providers: [OwnersService],
  exports: [OwnersService],
  controllers: [OwnersController],
})
export class OwnersModule {}
