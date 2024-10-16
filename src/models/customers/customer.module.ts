import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CustomerService } from './customer.service';
import { Customer } from './customer.model';
import { Project } from '../projects/project.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer, Project])],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    CustomerService,
  ],
  exports: ['SEQUELIZE', SequelizeModule, CustomerService],
})
export class CustomerModule { }
