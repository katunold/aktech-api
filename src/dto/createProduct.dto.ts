import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  stokeId: number;

  @IsArray()
  products: Array<{
    productName: string;
    notes: string;
  }>;
}
