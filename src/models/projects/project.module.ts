import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProjectService } from './project.service';
import { User } from '../users/user.model';
import { TimeSheet } from '../timesheets/timesheet.model';
import { Project } from './project.model';
import { Task } from '../tasks/task.model';
import { ProjectUser } from '../projectUsers/projectUser.model';
import { ProjectTask } from '../projectTasks/projectTask.model';
import { PmProject } from '../pmProjects/pmProject.model';
import { Customer } from '../customers/customer.model';

@Module({
  imports: [SequelizeModule.forFeature([User, TimeSheet, Project, Task, ProjectUser, ProjectTask, PmProject, Customer])],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    ProjectService
  ],
  exports: ['SEQUELIZE', SequelizeModule, ProjectService],
})
export class ProjectModule { }
