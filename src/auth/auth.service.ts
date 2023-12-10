import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto, LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/typeorm/entities/user.entity';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    const validPassword = await bcrypt.compare(userDto.password, user.password);
    if (!validPassword) {
      throw new HttpException('wrong password', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user);
  }

  async signup(userDto: SignupDto) {
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

  // Helper methods ..
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }
}
