import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../../../dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    categoryData: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    return await this.categoryRepository.save(categoryData).catch((error) => {
      throw error;
    });
  }

  async updateCategory(
    categoryId: number,
    updatedCategoryData: any,
  ): Promise<any> {
    return await this.categoryRepository
      .createQueryBuilder()
      .update(updatedCategoryData)
      .where({
        id: categoryId,
      })
      .returning('*')
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  async getCategoryList(): Promise<any[]> {
    return await this.categoryRepository.find({
      select: [
        'id',
        'categoryName',
        'createdBy',
        'updatedBy',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    });
  }

  async deleteCategory(id: number): Promise<any> {
    return await this.categoryRepository.softDelete({ id });
  }
}
