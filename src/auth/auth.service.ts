import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.entity';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async signup(userDto: CreateUserDto) {
    const exists = await this.usersService.getUserByEmail(userDto.email);
    if (exists)
      throw new HttpException('Such email is exisits', HttpStatus.BAD_REQUEST);
    const hash = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hash,
    });
    return this.generateToken(user);
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const compare = await bcrypt.compare(userDto.password, user.password);
    if (user && compare) {
      return user;
    }
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }
}
