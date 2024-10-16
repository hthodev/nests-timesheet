import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchService } from './branch.service';
import { Branch } from './branch.model';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Branch, User])],
  providers: [BranchService],
  exports: [BranchService],
})
export class BranchModule {}
