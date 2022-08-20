import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';
import { LoginLocalDto } from '../../dto/loginLocal.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : null;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      password: user.password,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
