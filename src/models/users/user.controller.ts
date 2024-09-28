import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, Query, Req, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserParam, IUserRelation } from './user.interface';
import { responseEndpoint } from 'src/responses/endpoint';
import { JoiValidationBodyPipe } from 'src/middlewares/joiValidationPipe';
import { allUsersNoPagingDTO, createNewOrUpdateEmployeeDTO, userIdValid } from './user.validation';
import { validate } from 'uuid';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('my-information')
  async myInformation(@Req() req: Request ) {
    const user = req['user']
    return responseEndpoint({
      result: await this.userService.myInformation(user.id)
    });
  }

  @Post('create-new-employee')
  @UsePipes(new JoiValidationBodyPipe(createNewOrUpdateEmployeeDTO))
  async createNewEmployee(@Body() body: ICreateUserParam): Promise<any> {
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
  @UsePipes(new JoiValidationBodyPipe(allUsersNoPagingDTO))
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
  @UsePipes(new JoiValidationBodyPipe(createNewOrUpdateEmployeeDTO))
  async updateEmployee(@Param('userId') userId: string, @Body() body: IUserRelation) {    
    if (!validate(userId)) throw new HttpException('userId is required', 400);
    await this.userService.updateEmployee(body, userId)
    return responseEndpoint({
      result: 'Updated'
    })
  }

  @Put('change-active-employee/:userId')
  async changeActiveEmployee(@Param('userId') userId: string, @Body() body: { isActive: boolean }) {
    if (!validate(userId)) throw new HttpException('userId is required', 400);
    await this.userService.changeActiveEmployee(userId, body)
    return responseEndpoint({
      result: 'Deleted'
    })
  }
}
