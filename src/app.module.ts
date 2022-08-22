import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pwd',
      database: 'aktech-db',
      entities: [],
      migrations: ['src/migrations/**/*{.ts,.js}'],
      retryAttempts: 5,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
