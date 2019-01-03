import { GetUserDTO } from './../models/user/get-user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../data/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminPanelService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,

    ) { }

    async changeUserRole(user: GetUserDTO) {
        const userFound = await this.usersRepository.findOne({ where: { username: user.username } });
        if (!userFound) {
            throw new BadRequestException('There is no such user with this username');
        }
        if (userFound.role === user.role) {
            throw new BadRequestException('Cannot change user\'s role with same role');
        }
        if (userFound.role === 'Admin') {
            throw new BadRequestException('Cannot change user\'s admin role with another');
        }
        await this.usersRepository.update({ username: user.username }, { role: user.role });
        return 'Role changed';
    }
}
