import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { ProductDto } from '../../../dto/productDto';
import { JwtAuthGuard } from '../../../auth/guard/jwtAuth/jwt-auth.guard';
import { GetProductListDto } from '../../../dto/getProductList.dto';
import { UpdateProductDto } from '../../../dto/updateProduct.dto';
import { CreateProductDto } from '../../../dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(
    @Req() req: any,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto[]> {
    try {
      const products: ProductDto[] = createProductDto.products.map(
        (product) => ({
          ...product,
          stockId: createProductDto.stokeId,
          createdBy: req.user.userId,
        }),
      );

      return await this.productService.createProduct(products);
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

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateProduct(
    @Req() req: any,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    const { user, params } = req;
    updateProductDto['updatedBy'] = user.userId;

    try {
      const updatedProductData = await this.productService.updateProduct(
        params.id,
        updateProductDto,
      );
      if (updatedProductData.raw.length) {
        return updatedProductData.raw[0];
      }
      throw 'Product not found';
    } catch (error) {
      if (error === 'Product not found') {
        throw new NotFoundException(`Product with id ${params.id} not found`);
      } else if (error.code == 23505) {
        throw new BadRequestException(
          `Product with the name ${updateProductDto.productName} already exists, please use a unique product name`,
        );
      } else {
        throw new InternalServerErrorException(
          'Sorry something went wrong on our end 😒',
        );
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async listAllProducts(): Promise<GetProductListDto[]> {
    try {
      return await this.productService.getProductList();
    } catch (error) {
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProduct(@Param() params): Promise<any> {
    try {
      const { id } = params;
      return await this.productService.getProductDetails(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }
}
