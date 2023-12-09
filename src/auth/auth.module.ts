import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
