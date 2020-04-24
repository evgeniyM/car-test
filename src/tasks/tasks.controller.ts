import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  run(): string {
    this.tasksService.delAndCalc()
    return 'OK';
  }
}
