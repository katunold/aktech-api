import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SupplierDto {
  @IsNotEmpty()
  supplierName: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  createdBy?: number;
  updatedBy?: number;
}
