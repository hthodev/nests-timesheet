import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkingTime } from '../../../models/workingTime.model';
import { WorkingTimeService } from './workingTime.service';

@Module({
  imports: [SequelizeModule.forFeature([WorkingTime])],
  providers: [WorkingTimeService],
  exports: [WorkingTimeService],
})
export class WorkingTimeModule {}
