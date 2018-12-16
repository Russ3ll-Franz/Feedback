import { UserLoginDTO } from '../models/user/user-login.dto';
import { AdminGuard } from './../common';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Get, Controller, UseGuards, Post, Body, FileInterceptor, UseInterceptors, UploadedFile, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  root(): string {
    return 'root';
  }

  @Get('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {
    return await this.authService.signIn(user);
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    }))
    user: UserLoginDTO,
    ): Promise<any> {

    try {
      await this.usersService.registerUser(user);
      return 'User added to database';
    } catch (error) {
      return (error.message);
    }
  }
}
