import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from '../entities/stock.entity';
import { StockController } from './controllers/stock/stock.controller';
import { ProductController } from './controllers/product/product.controller';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from './services/product/product.service';
import { StockService } from './services/stock/stock.service';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';
import { CategoryEntity } from '../entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity, ProductEntity, CategoryEntity]),
  ],
  providers: [ProductService, StockService, CategoryService],
  controllers: [StockController, ProductController, CategoryController],
})
export class ProductStockModule {}
