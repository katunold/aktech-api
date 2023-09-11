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
}
