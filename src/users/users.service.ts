import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new ConflictException('there is no user with a such Id');
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const exists = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (exists) throw new ConflictException('such E-Mail already exists');
    userDto.password = await bcrypt.hash(userDto.password, saltRounds);
    userDto.created = new Date();
    const newUser = this.userRepository.create(userDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: string, userDto: CreateUserDto): Promise<User> {
    await this.userRepository.update(id, userDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
