import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Project } from 'models/project.model';
import { Customer } from 'models/customer.model';
import { CustomerService } from './customer.service';

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
