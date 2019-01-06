import { AuthService } from './../auth/auth.service';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { Controller, Body, Post, BadRequestException, Param, Get, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { Roles } from '../common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) { }

  @Roles('Admin')
  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':username')
  gerUser(@Param() param) {
    try {
      return this.usersService.getUser(param);
    } catch (error) {
      throw new BadRequestException(`No user found!`);
    }
    /*
    return this.usersService.getUser(param).catch(() => {
      throw new BadRequestException(`No user found!`);
    });
    */
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
