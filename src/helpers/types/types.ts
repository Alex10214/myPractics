import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  id: string;
  email: string;
}

export class UserResponse {
  @ApiProperty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  access_token: string;
}
