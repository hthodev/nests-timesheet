import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'models/user.model';
import { ICreateUserParam } from './user.interface';

@Controller('services/app/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-user/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('create-new-user')
  async createNewUser(@Body() body: ICreateUserParam): Promise<any> {
    return this.userService.createNewUser(body);
  }
}
