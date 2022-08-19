import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../../dto/registerUser.dto';
import { LoginLocalDto } from '../../dto/loginLocal.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(userData: RegisterUserDto): Promise<RegisterUserDto> {
    const data = this.userRepository.create(userData);
    await this.userRepository.save(data).catch((error) => {
      throw error;
    });
    delete data.password;
    return data;
  }

  async findOne(email: string): Promise<LoginLocalDto> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
