import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  user: any;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    this.user = await this.userService.findOne(username);

    if (this.user) {
      const isMatch = await bcrypt.compare(password, this.user.password);
      return isMatch ? this.user : null;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: this.user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
