import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/users/types/role.enum';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByCredentials(email);

    if (!user) {
      throw new UnauthorizedException({ message: 'Wrong password or email.' });
    }

    const isPasswordMached = await bcrypt.compare(password, user.password);
    if (!isPasswordMached) {
      throw new UnauthorizedException({ message: 'Wrong password or email.' });
    }

    const payload = { sub: user.uuid, role: user.role, username: user.email };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  // add type
  async signUp(payload: SignUpDto): Promise<string> {
    const user = {
      ...payload,
      role: Role.USER,
    };

    return await this.usersService.create(user);
  }
}
