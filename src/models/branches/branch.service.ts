// src/user/user.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from '../../../models/branch.model';
import { User } from 'models/user.model';
import { Sequelize, Op } from 'sequelize';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch)
    private readonly branchModel: typeof Branch,
  ) {}
  @InjectModel(User)
  private readonly UserModel: typeof User;

  async getAllBranch() {
    const branches = await this.branchModel.findAll({
      useMaster: false,
      raw: true
    });
    const managerOffices = await this.UserModel.findAll({
      where: { officeManagerId: { [Op.ne]: null }},
      attributes: ['id', 'firstName', 'lastName', 'picture', 'officeManagerId'],
      raw: true,
      useMaster: false
    })

    return branches.map(branch => ({
      ...branch,
      managerOffice: managerOffices.find(manager => manager.officeManagerId === branch.id)
    }))
  }

  async create(branch: Partial<Branch>): Promise<Branch> {
    return this.branchModel.create(branch);
  }
}
