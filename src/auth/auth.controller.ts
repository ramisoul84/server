import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/signup')
  signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }
}
