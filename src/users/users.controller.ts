import { GetUserDTO } from './../models/user/get-user.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { Controller, Body, Post, Query, BadRequestException, Param, Get } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':username')
  // Should be protected with Admin rights
  gerUser(@Param() param) {
    if (!(+param.username)) {
      return this.usersService.getUser(param);
    }
    throw new BadRequestException('Username cannot be number');
  }

  @Post()
  // Should be protected with Admin rights
  changeRole(@Query() user) {
    if (!(+user.username) && !(+user.role)) {
      return this.usersService.changeUserRole(user);
    }
    throw new BadRequestException('Username or role cannot be number');
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
