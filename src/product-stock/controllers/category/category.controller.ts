import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { JwtAuthGuard } from '../../../auth/guard/jwtAuth/jwt-auth.guard';
import { CreateCategoryDto } from '../../../dto/createCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCategory(
    @Req() req: any,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    try {
      return await this.categoryService.createCategory({
        categoryName: createCategoryDto.categoryName,
        createdBy: req.user.userId,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Category name already exists');
      }
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }
}
