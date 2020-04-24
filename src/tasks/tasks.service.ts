import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { OwnersService } from '../owners/owners.service'
import { CarsService } from '../cars/cars.service'

@Injectable()
export class TasksService {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly carsService: CarsService,
    private schedulerRegistry: SchedulerRegistry,
  ){}

  private readonly logger = new Logger(TasksService.name);

  delAndCalc() {
    const taskName = 'delAndCalc'
    const callback = async () => {
      this.logger.debug(`Task ${taskName} executing!`);
      await this.ownersService.clearOld();
      await this.carsService.discount();

      this.schedulerRegistry.deleteTimeout(taskName);
      this.logger.debug(`Task ${taskName} deleted!`);
    };
  
    const timeout = setTimeout(callback, 1);
    this.schedulerRegistry.addTimeout(taskName, timeout);
  }

}