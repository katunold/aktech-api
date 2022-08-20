import { ConfigService } from '@nestjs/config';

export class Constants {
  constructor(private configService: ConfigService) {}

  public getConstants() {
    const secret: string = this.configService.get<string>('DEV_JWT_SECRET');
    return secret;
  }
}
