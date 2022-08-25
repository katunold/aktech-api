import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException, Param,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../../dto/createProduct.dto';
import { JwtAuthGuard } from '../../auth/guard/jwtAuth/jwt-auth.guard';
import { GetProductListDto } from '../../dto/getProductList.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(
    @Req() req: any,
    @Body() createProductDto: CreateProductDto[],
  ): Promise<CreateProductDto[]> {
    try {
      createProductDto = createProductDto.map(
        (product) => (product = { ...product, createdBy: req.user.userId }),
      );

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
