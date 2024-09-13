import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from '../../../models/branch.model';
import { User } from 'models/user.model';
import { Sequelize, Op } from 'sequelize';
import { IBodyUpdateBranch } from './branch.interface';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch)
    private readonly branchModel: typeof Branch,
  ) {}
  @InjectModel(User)
  private readonly UserModel: typeof User;

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

  async updateBranch(body: IBodyUpdateBranch, branchId: string) {
    console.log(body);
    
    const branch = await this.branchModel.findOne({
      where: { id: branchId },
      raw: true,
      attributes: ['id'],
      useMaster: false,
    });
    if (!branch) {
      throw new HttpException('No record updated', 400);
    }
    
    const updated = await this.branchModel.update(body, { where: { id: branchId }});
    if (!updated[0]) {
      throw new HttpException('No record updated', 400);
    }
    
  }

  async create(branch: Partial<Branch>): Promise<Branch> {
    return this.branchModel.create(branch);
  }
}
