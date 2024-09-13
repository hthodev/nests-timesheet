import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'models/user.model';
import { ICreateUserParam } from './user.interface';
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

  @Post('create-new-user')
  async createNewUser(@Body() body: ICreateUserParam): Promise<any> {
    return responseEndpoint({
      result: await this.userService.createNewUser(body)
    })
  }

  @Get('get-all-users-no-paging')
  async allUsersNoPaging(): Promise<any> {
    return responseEndpoint({
      result: await this.userService.getAllUserNoPaging(),
    })
  }
}
