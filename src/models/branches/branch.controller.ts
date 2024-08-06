import { Controller, Get, Param } from '@nestjs/common';
import { BranchService } from './branch.service';
import { Branch } from 'models/branch.model';

@Controller('users')
export class UserController {
  constructor(private readonly branchService: BranchService) {}

  // @Get('get-user/:id')
  // async getUser(@Param('id') id: string): Promise<Branch> {
  //   return this.branchService.findOne(id);
  // }
}
