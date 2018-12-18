import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './../../interfaces/jwt-payload';
import { validate } from 'class-validator';
import { Users } from 'src/data/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

  ) { }

  async registerUser(user) {
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });
    if (userFound) {
      throw new BadRequestException('There is already such email registered!');
    }

    const userNameFound = await this.usersRepository.findOne({ where: { username: user.username } });
    if (userNameFound) {
      throw new BadRequestException('There is already such username registered!');
    }

    if (!user.password){
      throw new BadRequestException('Password cannot be null!');
    }

    if (!user.firstName){
      throw new BadRequestException('First name cannot be null');
    }

    if (!user.lastName){
      throw new BadRequestException('Last name cannot be null');
    }

    if (!user.email){
      throw new BadRequestException('Email cannot be null!');
    }

    if (!user.username){
      throw new BadRequestException('Username cannot be null!');
    }

    user.password = await bcrypt.hash(user.password, 10);

    user.role = 'User';

    await this.usersRepository.create(user);

    const result = await this.usersRepository.save([user]);

    return result;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository.findOne({ where: { email: payload.email } });

    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository.findOne({ select: ['username', 'password'], where: { username: user.username } });
    if (userFound) {
      const result = user.password === userFound.password;
      if (result) {
        return userFound;
      }
    }

    throw new NotFoundException('Wrong credentials');
  }

  async getAll() {
    return this.usersRepository.find({});
  }
}
