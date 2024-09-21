import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from 'models/task.model';
import { TaskService } from './task.service';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
