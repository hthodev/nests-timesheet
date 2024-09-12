import { Controller, Get, Param } from '@nestjs/common';
import { BranchService } from './branch.service';
import { Branch } from 'models/branch.model';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('/branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
  
  @Get('get-all-branches')
  async getAllBranch() {
    return responseEndpoint({
      result: await this.branchService.getAllBranch()
    })
  }
}
