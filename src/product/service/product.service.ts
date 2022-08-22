import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../../dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    productData: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    const data = this.productRepository.create(productData);
    await this.productRepository.save(data).catch((error) => {
      throw error;
    });

    return data;
  }
}
