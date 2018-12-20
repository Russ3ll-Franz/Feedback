import { GetUserDTO } from './../models/user/get-user.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { Controller, Body, Post, Query, BadRequestException } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  changeRole(@Query() user) {
    if (!(+user.username)) {
      return this.usersService.changeUserRole(user);
    }
    return new BadRequestException('Username cannot be number');
  }

  @Post('login')
  userLog(@Body() body: GetUserDTO) {
    return this.usersService.signIn(body);
  }

  @Post('register')
  userRegister(@Body() user: UserRegisterDTO) {
    return this.usersService.registerUser(user);
  }
}
