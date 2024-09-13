// src/user/user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../../models/user.model';
import { ICreateUserParam } from './user.interface';
import { calculateWorkingTime, hashPassword } from 'src/shares/ultis';
import { WorkingTime } from '../../../models/workingTime.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  @InjectModel(WorkingTime)
  private readonly workingTimeModel: typeof WorkingTime;

  async createNewUser(body: ICreateUserParam): Promise<User> {
    const transaction = await this.sequelize.transaction();
    try {
      const userId = uuidv4();
      const workingTime = {
        userId,
        morningStartAt: body.morningStartAt,
        morningEndAt: body.morningEndAt,
        morningWorking: calculateWorkingTime(body.morningStartAt, body.morningEndAt),
        afternoonStartAt: body.afternoonStartAt,
        afternoonEndAt: body.afternoonEndAt,
        afternoonWorking: calculateWorkingTime(body.afternoonStartAt, body.afternoonEndAt),
      }
      const user = {
        isActive: body.isActive,
        allowedLeaveDay: body.allowedLeaveDay,
        branchId: body.branchId,
        email: body.email,
        type: body.type,
        firstName: body.firstName,
        lastName: body.lastName,
        sex: body.sex,
        level: body.level,
        salary: body.salary,
        address: body.address,
        phoneNumber: body.phoneNumber,
        userName: body.userName,
        password: hashPassword(body.password),
      }

      await this.workingTimeModel.create(workingTime, { transaction });

      const createdUser = await this.userModel.create(user, { transaction });

      await transaction.commit();
      return createdUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async myInformation(id) {
    return this.userModel.findOne({
      where: { id },
      useMaster: false,
      raw: true
    });
  }

  async getAllUserNoPaging() {
    return await this.userModel.findAll({
      raw: true,
      attributes: ['id', 'firstName', 'lastName', 'picture']
    })
  }
}
