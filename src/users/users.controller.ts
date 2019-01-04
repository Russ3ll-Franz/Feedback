import { AuthService } from './../auth/auth.service';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { Controller, Body, Post, BadRequestException, Param, Get, ValidationPipe } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { UserLoginDTO } from '../models/user/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) { }

  @Get(':username')
  gerUser(@Param() param) {
    if (!(+param.username)) {
      return this.usersService.getUser(param);
    }
    throw new BadRequestException('Username cannot be number');
  }

  @Get('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {
    return await this.authService.signIn(user);
  }

  @Post('register')
  async register(@Body(new ValidationPipe({
    transform: true, whitelist: true,
  }))
  user: UserRegisterDTO,
  ): Promise<any> {

    try {
      await this.usersService.registerUser(user);
      return 'Successfully registered!';
    } catch (error) {
      return (error.message);
    }
  }
}
