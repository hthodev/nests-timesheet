import { Controller, Get, UseGuards, Req, Post, Body, HttpException, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { responseEndpoint } from 'src/responses/endpoint';
import { IAuthentication } from './auth.interface';
import { comparePassword, signToken } from 'src/shares/ultis';

@Controller('TokenAuth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    const user = this.authService.verifyLogin(req.user)
    return responseEndpoint({ result: user });
  }

  @Post('Authenticate')
  @HttpCode(200)
  async authenticate(@Body() body: IAuthentication) {
    const user = await this.authService.authenticate(body);
    if (!user) throw new HttpException("wrong user or password", 400);
    if (comparePassword(body.password, user?.password)) {
      return responseEndpoint({ 
        result: { 
          accessToken: await signToken(user),
          userId: user.id,
          expireInSeconds: Math.floor(Date.now() / 1000) + (60 * 60)
        } 
      })
    }

    throw new HttpException("wrong user or password", 400);
  }
}
