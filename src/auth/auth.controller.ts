import { UserLoginDTO } from '../models/user/user-login.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Get, Controller, UseGuards, Post, Body, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  // For testing purpose
  @Get()
  @Roles('Team Lead', 'Admin')
  @UseGuards(AuthGuard(), RolesGuard)
  root(): string {
    return 'root';
  }

  // Public route
  @Get('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {
    return await this.authService.signIn(user);
  }

  // Public route
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
