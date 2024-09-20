import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, UsePipes } from '@nestjs/common';
import { BranchService } from './branch.service';
import { responseEndpoint } from 'src/responses/endpoint';
import { IBodyBranch } from './branch.interface';
import { validate } from 'uuid';
import { JoiValidationBodyPipe } from 'src/middlewares/joiValidationPipe';
import { updateOrCreateBranch } from './branch.validation';

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
  @UsePipes(new JoiValidationBodyPipe(updateOrCreateBranch))
  async updateBranch(@Param('branchId') branchId: string, @Body() body: IBodyBranch) {
    if (!validate(branchId)) throw new HttpException('branchId is required', 400);
    await this.branchService.updateBranch(body, branchId);
    return responseEndpoint({
      result: 'Updated'
    })
  }

  
  @Delete('delete-branch/:branchId')
  async deleteBranch(@Param('branchId') branchId: string) {
    if (!validate(branchId)) throw new HttpException('userId is required', 400);
    await this.branchService.deleteBranch(branchId);
    return responseEndpoint({
      result: 'Deleted'
    })
  }

  @Post('new-branch')
  @UsePipes(new JoiValidationBodyPipe(updateOrCreateBranch))
  async newBranch(@Body() body: IBodyBranch) {
    return responseEndpoint({
      result: await this.branchService.newBranch(body)
    })
  }
}
