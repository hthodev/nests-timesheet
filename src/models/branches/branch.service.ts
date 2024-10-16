import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4 } from 'sequelize';
import { IBodyBranch } from './branch.interface';
import { v4 as uuidV4 } from 'uuid'; 
import { Branch } from './branch.model';
import { User } from '../users/user.model';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch)
    private readonly branchModel: typeof Branch,
  ) {}
  @InjectModel(User)
  private readonly UserModel: typeof User;

  async findBranch(branchId: string, name?: string) {
    return await this.branchModel.findOne({
      where: { [Op.or]: { id: branchId, ...(name ? { name } : {}) } },
      raw: true,
      useMaster: false,
    });
  }

  async getAllBranch() {
    return await this.branchModel.findAll({
      useMaster: false,
      raw: true,
      nest: true,
      include: {
        model: this.UserModel,
        attributes: ['id', 'firstName', 'lastName', 'picture'],
      },
      order: [['createdAt', 'ASC']]
    });
  }

  async updateBranch(body: IBodyBranch, branchId: string) {
    const branch = await this.findBranch(branchId);
    if (!branch) {
      throw new HttpException('No record updated', 400);
    }
    
    const updated = await this.branchModel.update(body, { where: { id: branchId }});
    if (!updated[0]) {
      throw new HttpException('No record updated', 400);
    }
    
  }

  async deleteBranch(branchId) {
    const [branch, user] = await Promise.all([
      this.findBranch(branchId),
      this.UserModel.findOne({ where: { branchId, isActive: true }, attributes: ['id'], raw: true, useMaster: false})
    ]);
    if (!branch) {
      throw new HttpException('No record deleted', 400);
    }
    if (user) {
      throw new HttpException('Must deactivate users working on this branch or change users working to another branch', 400);
    }

    const updated = await this.branchModel.destroy({ where: { id: branchId }});
    if (!updated) {
      throw new HttpException('No record deleted', 400);
    }
  }

  async newBranch(body: IBodyBranch) {
    const branch = await this.findBranch(null, body.name);
    if (branch) {
      throw new HttpException('this name is conflict', 409);
    }

    return this.branchModel.create({
      id: body.id || uuidV4(),
      name: body.name,
      morningStartAt: body.afternoonStartAt,
      morningEndAt: body.morningEndAt,
      morningWorking: this.calculateTimeDifference(body.morningEndAt, body.morningStartAt),
      afternoonStartAt: body.afternoonStartAt,
      afternoonEndAt: body.afternoonEndAt,
      officeManagerId: body.officeManagerId,
      afternoonWorking: this.calculateTimeDifference(body.afternoonEndAt, body.afternoonStartAt),
    })
  }

  async create(branch: Partial<Branch>): Promise<Branch> {
    return this.branchModel.create(branch);
  }

  calculateTimeDifference(timeA, timeB) {
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    const totalMinutesA = hoursA * 60 + minutesA;
    const totalMinutesB = hoursB * 60 + minutesB;
    const differenceInMinutes = totalMinutesA - totalMinutesB;
    const differenceInHours = differenceInMinutes / 60;
  
    return differenceInHours;
  }
}
