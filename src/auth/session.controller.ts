import { UserService } from './../models/users/user.service';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { responseEndpoint } from 'src/responses/endpoint';

@Controller('Session')
export class SessionController {
  constructor(private readonly userService: UserService) {
  }
  @Get('GetCurrentLoginInformations')
  async getCurrentLoginInformations(): Promise<object> {
    return responseEndpoint({
      result: {
        application: {
          version: "4.3.0.0",
          releaseDate: "2023-08-16T14:02:52.6494268+07:00",
          features: {}
        },
        user: null,
        tenant: null
      }
    });
  }
}