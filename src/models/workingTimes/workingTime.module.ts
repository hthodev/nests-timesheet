import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkingTimeService } from './workingTime.service';
import { WorkingTime } from './workingTime.model';

@Module({
  imports: [SequelizeModule.forFeature([WorkingTime])],
  providers: [WorkingTimeService],
  exports: [WorkingTimeService],
})
export class WorkingTimeModule {}
