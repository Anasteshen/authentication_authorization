import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

// @TODO: should be moved to utils
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    createQueryBuilder: jest.fn(),
    find: jest.fn(),
    insert: jest.fn(),
    delete: jest.fn(),
  }),
);

const userRepositoryUserMock = {
  uuid: '1',
  email: 'test@test.com',
  firstName: 'firstName_test',
  lastName: 'lastName_test',
  password: 'password_test',
  role: 'user',
};

describe('UsersSerivece', () => {
  let usersService: UsersService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    usersService = moduleRef.get(UsersService);
    repositoryMock = moduleRef.get(getRepositoryToken(User));
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const userRepositoryFindMock = [userRepositoryUserMock];
      repositoryMock.find.mockReturnValue(userRepositoryFindMock);

      const result = await usersService.getUsers();

      expect(repositoryMock.find).toHaveBeenCalledTimes(1);
      expect(result).toBe(userRepositoryFindMock);
    });
  });

  describe('getUserByUuid', () => {
    it('should return an user', async () => {
      repositoryMock.findOne.mockReturnValue(userRepositoryUserMock);
      const result = await usersService.getUserByUuid(
        userRepositoryUserMock.uuid,
      );

      expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { uuid: userRepositoryUserMock.uuid },
      });
      expect(result).toBe(userRepositoryUserMock);
    });
  });

  describe('create', () => {
    it('should create new user', async () => {
      const createUserPayload = {
        email: 'test@test.com',
        firstName: 'firstName_test',
        lastName: 'lastName_test',
        password: 'password_test',
        role: 'user',
      };

      const userRepositoryInsertMock = { identifiers: [{ uuid: 'uuid_123' }] };
      repositoryMock.insert.mockReturnValue(userRepositoryInsertMock);
      repositoryMock.findOne.mockReturnValue(null);

      const result = await usersService.create(createUserPayload);

      expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
      expect(repositoryMock.insert).toHaveBeenCalledTimes(1);
      expect(result).toBe(userRepositoryInsertMock.identifiers[0].uuid);
    });

    it('should throw error when user with same email already exist', async () => {
      const createUserPayload = {
        email: 'test@test.com',
        firstName: 'firstName_test',
        lastName: 'lastName_test',
        password: 'password_test',
        role: 'user',
      };
      repositoryMock.findOne.mockReturnValue(userRepositoryUserMock);

      const result = usersService.create(createUserPayload);

      expect(repositoryMock.findOne).toHaveBeenCalledTimes(1);
      await expect(result).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete user by uuid', async () => {
      await usersService.delete(userRepositoryUserMock.uuid);
      expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    });
  });
});
