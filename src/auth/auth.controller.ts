import { Controller, Get, UseGuards, Req, Post, Body, HttpException, HttpCode, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { responseEndpoint } from 'src/responses/endpoint';
import { IAuthentication, IResponseGoogle } from './auth.interface';
import { comparePassword, signToken } from 'src/shares/ultis';
import { GoogleAuthService } from './google-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthService: GoogleAuthService
  ) { }
  @Post('google/login')
  @HttpCode(200)
  async googleLogin(@Body('credential') token: string) {
    const payload = await this.googleAuthService.verifyToken(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = this.authService.verifyGoogle((payload as IResponseGoogle));
    return responseEndpoint({
      result: await signToken(user),
      status: 200
    })
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
