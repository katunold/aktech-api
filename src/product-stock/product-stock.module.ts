import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from '../entities/stock.entity';
import { StockController } from './controllers/stock/stock.controller';
import { ProductController } from './controllers/product/product.controller';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from './services/product/product.service';
import { StockService } from './services/stock/stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity, ProductEntity])],
  providers: [ProductService, StockService],
  controllers: [StockController, ProductController],
})
export class ProductStockModule {}
