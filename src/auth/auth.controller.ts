import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserResponse } from '../helpers/types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Api')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('registration')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @ApiTags('Api')
  @ApiResponse({ status: 200, type: UserResponse })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  // async login(@Req() req): Promise<UserResponse> {
  async login(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.authService.loginUser(createUserDto);
  }
}
