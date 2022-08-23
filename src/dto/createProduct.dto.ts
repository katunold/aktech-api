import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;
  notes: string;
  createdBy?: number;
}
