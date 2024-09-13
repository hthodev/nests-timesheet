import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { BranchService } from './branch.service';
import { Branch } from 'models/branch.model';
import { responseEndpoint } from 'src/responses/endpoint';
import { IBodyUpdateBranch } from './branch.interface';

@Controller('/branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
  
  @Get('get-all-branches')
  async getAllBranch() {
    return responseEndpoint({
      result: await this.branchService.getAllBranch()
    })
  }

  @Put('update-branch/:branchId')
  async updateBranch(@Param('branchId') branchId: string, @Body() body: IBodyUpdateBranch) {
    await this.branchService.updateBranch(body, branchId);
    return responseEndpoint({
      result: 'Updated'
    })
  }
}
