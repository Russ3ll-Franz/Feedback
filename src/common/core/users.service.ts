import { UserRegisterDTO } from './../../models/user/user-register.dto';
import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './../../interfaces/jwt-payload';
import { Users } from '../../data/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

  ) { }

  async registerUser(user) {
    try {
      const userNameFound = await this.usersRepository.findOne({ where: { username: user.username } });

      if (userNameFound) {
        throw new BadRequestException('There is already such username registered!');
      }
      const userFound = await this.usersRepository.findOne({ where: { email: user.email } });
      if (userFound) {
        throw new BadRequestException('There is already such email registered!');
      }

      user.role = 'User';
      user.password = await bcrypt.hash(user.password, 10);

      await this.usersRepository.create(user);
      return await this.usersRepository.save([user]);
    } catch (error) {
      throw new BadRequestException('Check input fields', 'Invalid user input field');
    }
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository.findOne({ where: { username: payload.username } });
    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository.findOne(
      { select: ['username', 'password', 'role'], where: { username: user.username } });
    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);

      if (result) {
        return userFound;
      }
    }
    throw new NotFoundException('Wrong credentials');
  }

  async getUser(user) {
    try {
      return this.usersRepository.findOneOrFail({ where: { username: user.username } });
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }
}
