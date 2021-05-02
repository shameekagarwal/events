import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller()
@UsePipes(ValidationPipe)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('signup')
  async signup(@Body() body: UserCredentialsDto) {
    const message = await this.appService.signup({
      email: body.email,
      password: body.password,
    });
    return { message };
  }

  @Post('signin')
  async signin(@Body() body: UserCredentialsDto) {
    const payload = await this.appService.signin({
      email: body.email,
      password: body.password,
    });
    return { payload };
  }

  @Get('currentuser')
  currentUser(@Req() request: Request) {
    return {
      currentUser: request.currentUser,
    };
  }
}
