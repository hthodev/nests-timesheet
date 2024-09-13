import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { BranchService } from './branch.service';
import { responseEndpoint } from 'src/responses/endpoint';
import { IBodyBranch } from './branch.interface';

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
  async updateBranch(@Param('branchId') branchId: string, @Body() body: IBodyBranch) {
    await this.branchService.updateBranch(body, branchId);
    return responseEndpoint({
      result: 'Updated'
    })
  }

  
  @Delete('delete-branch/:branchId')
  async deleteBranch(@Param('branchId') branchId: string) {
    await this.branchService.deleteBranch(branchId);
    return responseEndpoint({
      result: 'Deleted'
    })
  }

  @Post('new-branch')
  async newBranch(@Body() body: IBodyBranch) {
    return responseEndpoint({
      result: await this.branchService.newBranch(body)
    })
  }
}
