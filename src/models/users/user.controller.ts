import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'models/user.model';
import { ICreateUserParam } from './user.interface';
import { MyInformationDTO } from './user.validation';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('my-information')
  async myInformation(@Req() req: Request ): Promise<User> {
    const user = req['user']
    return this.userService.myInformation(user.userId);
  }

  @Post('create-new-user')
  async createNewUser(@Body() body: ICreateUserParam): Promise<any> {
    return this.userService.createNewUser(body);
  }
}
