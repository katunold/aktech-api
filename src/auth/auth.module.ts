import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategyService } from './service/local-strategy.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategyService],
})
export class AuthModule {}
