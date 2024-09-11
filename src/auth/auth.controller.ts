import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  HttpException,
  HttpCode,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
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
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Post('google/login')
  @HttpCode(200)
  async googleAuthLogin(@Body() body: any) {
    try {
      const token = body.token;
      const payload = await this.googleAuthService.verifyToken(token);
      if (!payload) throw new UnauthorizedException('Invalid token');

      const user = await this.authService.verifyGoogle(
        payload as IResponseGoogle,
      );
      return responseEndpoint({
        result: {
          token: await signToken(user)
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, 500);
    }
  }
}
