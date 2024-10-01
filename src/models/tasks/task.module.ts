import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from 'models/task.model';
import { TaskService } from './task.service';
import { ProjectTask } from 'models/projectTask.model';

@Module({
  imports: [SequelizeModule.forFeature([Task, ProjectTask])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
