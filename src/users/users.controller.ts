import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { Role } from 'src/users/types/role.enum';
import { RolesGuard } from 'src/utils/guards/roles.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrives array of users' })
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('/:uuid')
  @ApiOperation({ summary: 'Retrives the user by uuid' })
  async getUser(@Param('uuid') uuid: string): Promise<User> {
    return await this.userService.getUserByUuid(uuid);
  }

  @Delete('/:uuid')
  @ApiOperation({ summary: 'Delete the user by uuid' })
  // @TODO: other way - implement casl.
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async deleteUser(@Param('uuid') uuid: string): Promise<void> {
    await this.userService.delete(uuid);
  }
}
