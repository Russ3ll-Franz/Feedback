import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../common/core/users.service';
import { UserLoginDTO } from '../models/user/user-login.dto';

jest.mock('./../auth/auth.service'); // mock AuthService
jest.mock('./../common/core/users.service'); // mock UsersService

describe('AuthController', () => {
  let userServ: UsersService;
  let authServ: AuthService;
  let ctrl: AuthController;
  let user: UserLoginDTO;

  beforeEach(() => {
    userServ = new UsersService(null);
    authServ = new AuthService(userServ, null);
    ctrl = new AuthController(authServ, userServ);
    user = new UserLoginDTO();
  });

  it('should call AuthService signIn method', async () => {
    // Arrange
    jest.spyOn(authServ, 'signIn').mockImplementation(() => {
      return 'token';
    });

    // Act
    await ctrl.sign(user);

    // Assert
    expect(authServ.signIn).toHaveBeenCalledTimes(1);
  });

  it('should call UsersService register method', async () => {
    // Arrange
    jest.spyOn(authServ, 'signIn').mockImplementation(() => {
      return 'token';
    });

    // Act
    await ctrl.register(user);

    // Assert
    expect(userServ.registerUser).toHaveBeenCalledTimes(1);
  });
});
