import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { UserRegisterDTO } from '../../models/user/user-register.dto';
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

  async registerUser(user: UserRegisterDTO) {
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });
    if (userFound) {
      throw new BadRequestException('There is already such user registered!');
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.role = user.role;
    user.firstName = user.firstName;
    user.lastName = user.lastName;
    user.username = user.username;

    await this.usersRepository.create(user);

    const result = await this.usersRepository.save([user]);

    return result;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository.findOne({ where: { email: payload.email } });

    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository.findOne({ select: ['email', 'password'], where: { email: user.email } });

    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);
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
