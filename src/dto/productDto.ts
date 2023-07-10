import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  productName: string;
  notes: string;
  stockId: number;
  createdBy?: number;
}
