import { IsOptional, IsUUID, IsString } from 'class-validator';
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
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Smith',
    description: 'Last Name',
    required: false,
  })
  readonly lastName: string;

  @IsString()
  @ApiProperty({
    example: 'user123@gmail.com',
    description: 'Email',
    required: true,
  })
  readonly email: string;

  @IsString()
  @ApiProperty({
    example: 'pass123*#',
    description: 'Password',
    required: true,
  })
  readonly password: string;
}
