import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from '../../../dto/productDto';
import { GetProductListDto } from '../../../dto/getProductList.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productData: ProductDto[]): Promise<ProductDto[]> {
    return await this.productRepository.save(productData).catch((error) => {
      throw error;
    });
  }

  async updateProduct(
    productId: number,
    updatedProductData: any,
  ): Promise<any> {
    return await this.productRepository
      .createQueryBuilder()
      .update(updatedProductData)
      .where({
        id: productId,
      })
      .returning('*')
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  async getProductList(): Promise<GetProductListDto[]> {
    return await this.productRepository
      .find({
        select: [
          'id',
          'productName',
          'pricePerUnit',
          'stock',
          'productStatus',
          'createdAt',
          'updatedAt',
        ],
      })
      .catch((error) => {
        throw error;
      });
  }

  async getProductDetails(id): Promise<any> {
    return await this.productRepository
      .find({
        where: { id },
        select: [
          'id',
          'productName',
          'availableStoke',
          'pricePerUnit',
          'productStatus',
          'notes',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy',
        ],
      })
      .catch((error) => {
        throw error;
      });
  }
}
