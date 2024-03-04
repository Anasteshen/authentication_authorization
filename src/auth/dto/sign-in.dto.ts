import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'john1234john' })
  @IsString()
  password: string;
}
