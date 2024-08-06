import { Controller, Get, Param } from '@nestjs/common';
import { WorkingTimeService } from './workingTime.service';
import { WorkingTime } from 'models/workingTime.model';

@Controller('users')
export class UserController {
  constructor(private readonly workingTimeService: WorkingTimeService) {}

  @Get('get-user/:id')
  async getUser(@Param('id') id: string): Promise<WorkingTime> {
    return this.workingTimeService.findOne(id);
  }
}
