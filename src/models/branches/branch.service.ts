// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from '../../../models/branch.model';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch)
    private readonly branchModel: typeof Branch,
  ) {}
  async create(branch: Partial<Branch>): Promise<Branch> {
    return this.branchModel.create(branch);
  }
}
