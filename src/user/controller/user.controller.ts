import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RegisterUserDto } from '../../dto/registerUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() registerUserDTO: RegisterUserDto,
  ): Promise<RegisterUserDto> {
    try {
      return await this.userService.register(registerUserDTO);
    } catch (error) {
      if (error.detail.includes('already exists.')) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
      }
      throw new InternalServerErrorException(
        'Sorry something went wrong on our end 😒',
      );
    }
  }
}
