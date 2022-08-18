import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../../dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async register(userData: RegisterUserDto): Promise<RegisterUserDto> {
    const data = this.usersRepository.create(userData);
    await this.usersRepository.save(data).catch((error) => {
      throw error;
    });
    delete data.password;
    return data;
  }
}
