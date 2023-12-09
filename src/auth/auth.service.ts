import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async login(userDto: LoginUserDto) {}

  async signup(userDto: LoginUserDto) {}

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const compare = await bcrypt.compare(userDto.password, user.password);
    if (user && compare) {
      return user;
    }
  }

  private async generateToken() {}
}
