import { AuthController } from './../auth/auth.controller';
import { AuthService } from './../auth/auth.service';
import { UsersService } from './../common/core/users.service';
import { UserLoginDTO } from '../models/user/user-login.dto';

jest.mock('./../auth/auth.service'); // mock AuthService
jest.mock('./../common/core/users.service'); // mock UserService

describe('AuthController', () => {
  it('should call AuthService signIn method', async () => {
    // Arrange
    const userServ = new UsersService(null);
    const authServ = new AuthService(userServ, null);
    const ctrl = new AuthController(authServ, userServ);
    const user = new UserLoginDTO();
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
    const userServ = new UsersService(null);
    const authServ = new AuthService(userServ, null);
    const ctrl = new AuthController(authServ, userServ);
    const user = new UserLoginDTO();
    jest.spyOn(authServ, 'signIn').mockImplementation(() => {
      return 'token';
    });

    // Act
    await ctrl.register(user);

    // Assert
    expect(userServ.registerUser).toHaveBeenCalledTimes(1);
  });
});
