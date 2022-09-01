import { IsEnum, IsNotEmpty, Min } from 'class-validator';
import { ProductStatus } from '../entities/product.entity';

export class UpdateProductDto {
  @IsNotEmpty()
  productName: string;

  notes: string;

  @Min(0)
  availableStoke: number;

  @IsEnum(ProductStatus)
  productStatus: string;
}
