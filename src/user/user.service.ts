import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password): Promise<string> {
    return await bcrypt.hash(password, 5);
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.userRepository.save({
      email: createUserDto.email,
      password: await this.hashPassword(createUserDto.password),
    });
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  // findAll() {
  //   return `This action returns all user`;
  // }
  //
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
