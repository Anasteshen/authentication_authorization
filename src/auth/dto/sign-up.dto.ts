import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsPassword } from 'src/utils/validators/password.validator';

export class SignUpDto {
  @ApiProperty({ example: 'John' })
  @IsEmail()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsEmail()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'john1234john' })
  @IsString()
  @IsPassword()
  password: string;
}
