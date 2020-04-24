import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { OwnersModule } from '../owners/owners.module'
import { CarsModule } from '../cars/cars.module'
import { TasksController } from './tasks.controller'

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [OwnersModule, CarsModule]
})
export class TasksModule {}
