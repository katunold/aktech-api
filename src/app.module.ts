import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductStockModule } from './product-stock/product-stock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 32768,
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
    ProductStockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
