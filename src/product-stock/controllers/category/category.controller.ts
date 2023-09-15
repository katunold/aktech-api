import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
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

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateCategory(
    @Req() req: any,
    @Body() updateCategoryDto: { categoryName: string },
  ): Promise<any> {
    const { user, params } = req;
    updateCategoryDto['updatedBy'] = user.userId;
    try {
      const updatedCategoryData = await this.categoryService.updateCategory(
        params.id,
        updateCategoryDto,
      );
      if (updatedCategoryData.raw.length) {
        return updatedCategoryData.raw[0];
      }
      throw 'Category not found';
    } catch (error) {
      if (error === 'Category not found') {
        throw new NotFoundException(`Category with id ${params.id} not found`);
      } else if (error.code == 23505) {
        throw new BadRequestException('Category name already exists');
      } else {
        throw new InternalServerErrorException(
          'Sorry something went wrong on our end 😒',
        );
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getCategoryList(): Promise<any[]> {
    try {
      return await this.categoryService.getCategoryList();
    } catch (error) {
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param() params): Promise<any> {
    const { id } = params;
    try {
      const result = await this.categoryService.deleteCategory(id);
      if (result.affected) {
        return { message: `Category with ID ${id} has been deleted` };
      }
      throw `not found`;
    } catch (error) {
      if (error === 'not found') {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }
}
