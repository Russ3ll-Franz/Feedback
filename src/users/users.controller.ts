import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, HttpService } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { AuthService } from './../auth/auth.service';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  all() {
    return this.usersService.getAll();
  }
}
