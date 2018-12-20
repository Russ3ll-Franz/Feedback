import { GetUserDTO } from './../models/user/get-user.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }
  @Post('login')
  userLog(@Body() body: GetUserDTO) {
    return this.usersService.signIn(body);
  }

  @Post('register')
  userRegister(@Body() user: UserRegisterDTO) {
    return this.usersService.registerUser(user);
  }
}
