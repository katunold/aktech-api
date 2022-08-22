import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../../dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    try {
      return await this.productService.createProduct(createProductDto);
    } catch (error) {
      if (error.detail.includes('already exists.')) {
        throw new BadRequestException(
          'Product name already exists, Select a different name',
        );
      }
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }
}
