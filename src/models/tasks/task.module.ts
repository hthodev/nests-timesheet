import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { ProjectTask } from '../projectTasks/projectTask.model';

@Module({
  imports: [SequelizeModule.forFeature([Task, ProjectTask])],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
