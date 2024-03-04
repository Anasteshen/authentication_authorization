import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as constants from '../utils/constants';
import { CreateUserPayload } from './types/create-user-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByCredentials(email: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email })
      .getOne();
  }

  async getUserByUuid(uuid: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { uuid },
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(payload: CreateUserPayload): Promise<string> {
    const existedUser = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (existedUser) {
      throw new BadRequestException('User with this email already exist.');
    }

    const hash = bcrypt.hashSync(payload.password, constants.bcrypt.saltRounds);
    const user = {
      ...payload,
      password: hash,
    };

    const { identifiers } = await this.userRepository.insert(user);
    return identifiers[0].uuid;
  }

  async delete(uuid: string): Promise<void> {
    await this.userRepository.delete({ uuid });
  }
}
