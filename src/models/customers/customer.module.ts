import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Project } from 'models/project.model';
import { Customer } from 'models/customer.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer, Project])],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
  ],
  exports: ['SEQUELIZE', SequelizeModule],
})
export class CustomerModule { }
