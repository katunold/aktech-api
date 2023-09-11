import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  productName: string;
  notes: string;
  @IsNotEmpty()
  stock: number;
  createdBy?: number;
}
