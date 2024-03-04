import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as express from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Use this endpoint to sign in' })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Use this endpoint to create new user' })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<string> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('sign-out')
  @ApiOperation({ summary: 'Use this endpoint to sign out' })
  async logout(@Req() request: express.Request, @Res() res: express.Response) {
    delete request.headers.authorization;

    request.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      res.clearCookie('connect.sid');
      return res.status(200).send('Logged out successfully');
    });
  }
}
