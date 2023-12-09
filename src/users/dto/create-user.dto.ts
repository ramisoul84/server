import {
  IsOptional,
  IsUUID,
  IsString,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  readonly id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'John',
    description: 'First Name',
    required: false,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Smith',
    description: 'Last Name',
    required: false,
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email',
    required: true,
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'pass123*#',
    description: 'Password',
    required: true,
  })
  password: string;

  created: Date;
}
