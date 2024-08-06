import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Branch } from '../../../models/branch.model';
import { BranchService } from './branch.service';

@Module({
  imports: [SequelizeModule.forFeature([Branch])],
  providers: [BranchService],
  exports: [BranchService],
})
export class BranchModule {}
