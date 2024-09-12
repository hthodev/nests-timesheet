import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Branch } from '../../../models/branch.model';
import { BranchService } from './branch.service';
import { User } from 'models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Branch, User])],
  providers: [BranchService],
  exports: [BranchService],
})
export class BranchModule {}
