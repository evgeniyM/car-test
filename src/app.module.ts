import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { OwnersModule } from './owners/owners.module';
import { CarOwnersModule } from './car-owners/car-owners.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadModels: true,
      synchronize: true,
    }),
    CarsModule,
    ManufacturersModule,
    OwnersModule,
    CarOwnersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
