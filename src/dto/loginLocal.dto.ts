import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginLocalDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
