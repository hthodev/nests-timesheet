import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'models/user.model';
import { ICreateUserParam, IUserRelation } from './user.interface';
import { MyInformationDTO } from './user.validation';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('my-information')
  async myInformation(@Req() req: Request ) {
    const user = req['user']
    return responseEndpoint({
      result: await this.userService.myInformation(user.userId)
    });
  }

  @Post('create-new-employee')
  async createNewUser(@Body() body: ICreateUserParam): Promise<any> {
    return responseEndpoint({
      result: await this.userService.createNewEmployee(body)
    })
  }

  @Get('get-all-users-no-paging')
  async allUsersNoPaging(): Promise<any> {
    return responseEndpoint({
      result: await this.userService.getAllUserNoPaging(),
    })
  }

  @Post('get-account-employees-paging')
  @HttpCode(200)
  async getAccountEmployeesPaging(@Body() body: any): Promise<any> {
    return responseEndpoint({
      result: await this.userService.getAccountEmployeesPaging(body),
    })
  }

  @Get('get-all-managers')
  async getAllManagers() {
    return responseEndpoint({
      result: await this.userService.getAllManagers()
    })
  }

  @Put('update-employee/:userId')
  async updateEmployee(@Param('userId') userId: string, @Body() body: IUserRelation) {
    await this.userService.updateEmployee(body, userId)
    return responseEndpoint({
      result: 'Updated'
    })
  }

  @Put('change-active-employee/:userId')
  async changeActiveEmployee(@Param('userId') userId: string, @Body() body: { isActive: boolean }) {
    await this.userService.changeActiveEmployee(userId, body)
    return responseEndpoint({
      result: 'Deleted'
    })
  }
}
