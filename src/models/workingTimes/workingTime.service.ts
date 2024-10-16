// src/user/user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { WorkingTime } from './workingTime.model';

@Injectable()
export class WorkingTimeService {
  constructor(
    @InjectModel(WorkingTime)
    private readonly workingTimeModel: typeof WorkingTime,
  ) {}

  async create(workingTime: Partial<WorkingTime>, transaction) {
    return await this.workingTimeModel.create(workingTime, transaction);
  }

  async findAll(): Promise<WorkingTime[]> {
    return this.workingTimeModel.findAll();
  }

  async findOne(id: string): Promise<WorkingTime> {
    return this.workingTimeModel.findByPk(id);
  }

  // async update(id: string, user: Partial<WorkingTime>): Promise<[number, WorkingTime[]]> {
  //   return this.workingTimeModel.update(user, { where: { id } });
  // }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
