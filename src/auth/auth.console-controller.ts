import { Command, Console } from 'nestjs-console';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/users/types/role.enum';
import { CreateUserPayload } from 'src/users/types/create-user-payload';

@Console({ command: 'auth' })
export class AuthConsoleController {
  constructor(private usersService: UsersService) {}

  @Command({
    command: 'create-admin',
    options: [
      {
        flags: '--firstName <firstName>',
        required: true,
      },
      {
        flags: '--lastName <lastName>',
        required: true,
      },
      {
        flags: '--email <email>',
        required: true,
      },
      {
        flags: '--password <password>',
        required: true,
      },
    ],
    description: 'Create a super admin user',
  })
  async create(options: CreateUserPayload): Promise<string> {
    const user = {
      ...options,
      role: Role.ADMIN,
    };

    return await this.usersService.create(user);
  }
}
