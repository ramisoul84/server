import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../typeorm/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all users
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // get user by id
  @ApiOperation({ summary: 'Get a user by Id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // create a new user
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  // update a user
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: CreateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  // delete a user
  @ApiOperation({ summary: 'Delete an existing user' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return this.usersService.deleteUser(id);
    }
  }
}
