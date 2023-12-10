import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() userDto: SignupDto) {
    return this.authService.signup(userDto);
  }

  @Post('/login')
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }
}
