import { Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  run(): string {
    this.tasksService.delAndCalc()
    return 'OK';
  }
}
