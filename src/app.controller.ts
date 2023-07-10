import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginLocalDto } from './dto/loginLocal.dto';
import { LocalAuthGuard } from './auth/guard/localAuth/local-auth.guard';
import { AuthService } from './auth/service/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginLocalDto: LoginLocalDto) {
    return this.authService.login(loginLocalDto);
  }
}
