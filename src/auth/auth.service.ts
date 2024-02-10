import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Errors } from '../helpers/errors/errors';
import { UserResponse } from '../helpers/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, pass) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException(Errors.WRONG_DATA);
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(Errors.WRONG_DATA);
    }
    return user;
  }

  async registerUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const existUser = await this.userService.findOne(createUserDto.email);
    if (existUser) throw new BadRequestException(Errors.USER_EXIST);
    return this.userService.createUser(createUserDto);
  }

  async loginUser(user: CreateUserDto): Promise<UserResponse> {
    const existUser = await this.userService.findOne(user.email);
    if (!existUser) throw new BadRequestException(Errors.USER_NOT_EXIST);
    const { id, email } = existUser;

    return {
      id,
      email,
      access_token: this.jwtService.sign({ id, email }),
    };
  }
}
