import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../dto/createProduct.dto';
import { GetProductListDto } from '../../dto/getProductList.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    productData: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    await this.productRepository.save(productData).catch((error) => {
      throw error;
    });

    return productData;
  }

  async getProductList(): Promise<GetProductListDto[]> {
    return await this.productRepository
      .find({
        select: [
          'id',
          'productName',
          'pricePerUnit',
          'availableStoke',
          'createdAt',
          'updatedAt',
        ],
      })
      .catch((error) => {
        throw error;
      });
  }
}
