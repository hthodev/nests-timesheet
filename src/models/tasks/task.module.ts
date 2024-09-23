import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from 'models/task.model';
import { TaskService } from './task.service';
import { TaskProject } from 'models/taskProject.model';

@Module({
  imports: [SequelizeModule.forFeature([Task, TaskProject])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
