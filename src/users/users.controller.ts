import { GetUserDTO } from './../models/user/get-user.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { Controller, Body, Post, Query, BadRequestException, Param, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get(':username')
  gerUser(@Param() param) {
    if (!(+param.username)) {
      return this.usersService.getUser(param);
    }
    throw new BadRequestException('Username cannot be number');
  }

  @Post('login')
  userLog(@Body() body: GetUserDTO) {
    return this.usersService.signIn(body);
  }

  @Post('register')
  async register(@Body(new ValidationPipe({
    transform: true, whitelist: true,
    }))
    user: UserRegisterDTO,
  ): Promise<any> {

    try {
      await this.usersService.registerUser(user);
      return 'User added to database';
    } catch (error) {
      return (error.message);
    }
  }
}
