import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @Matches('([A-Za-zd!@#$&()-`.+,/"]+){8}', 'g')
  password: string;
}
