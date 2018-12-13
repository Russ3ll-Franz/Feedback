import { JwtServiceMock } from './mocks/jwt.service.mock';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth/auth.controller';
import { UsersService } from '../common/core/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let authService: AuthService;
  let authCtrl: AuthController;
  let jwtServiceMock: JwtServiceMock;

  beforeAll(async () => {
    jwtServiceMock = new JwtServiceMock({});
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],

      imports: [PassportModule.register({
        defaultStrategy: 'jwt',
      })],
      providers: [AuthService, UsersService, {
        provide: JwtService,
        useValue: jwtServiceMock,
      },
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    authCtrl = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should call AuthService signIn method', async () => {
    const user = new UserLoginDTO();
    jest.spyOn(authService, 'signIn');
    await authCtrl.sign(user);
    expect(authService.signIn).toHaveBeenCalledTimes(1);
  });
});
