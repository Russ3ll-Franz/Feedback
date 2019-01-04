import { UserRegisterDTO } from './../models/user/user-register.dto';
import { UserLoginDTO } from './../models/user/user-login.dto';
import { AuthService } from './../auth/auth.service';
import { UsersController } from './../users/users.controller';
import { UsersService } from './../common/core/users.service';

jest.mock('../common/core/users.service.ts'); // Users Service
jest.mock('../auth/auth.service.ts'); // Auth Service

describe('Users Controller', () => {
    let usersCtrl: UsersController;
    let userService: UsersService;
    let authService: AuthService;

    beforeEach(async () => {
        userService = new UsersService(null);
        authService = new AuthService(userService, null);
        usersCtrl = new UsersController(userService, authService);
    });

    it('should call UserService getUser method', async () => {
        // Arrange
        jest.spyOn(userService, 'getUser').mockImplementation(() => {
            return 'test';
        });
        // // Act
        await usersCtrl.gerUser('');

        // Assert
        expect(userService.getUser).toHaveBeenCalledTimes(1);
    });

    it('should call UserService signIn method', async () => {
        // Arrange
        jest.spyOn(authService, 'signIn').mockImplementation(() => {
            return 'test';
        });
        const user: UserLoginDTO = {
            username: 'm.bechev',
            password: 'TainoObichamAzis',
        };
        // // Act
        await usersCtrl.sign(user);

        // Assert
        expect(authService.signIn).toHaveBeenCalledTimes(1);
    });

    it('should call UserService registerUser method', async () => {
        // Arrange
        jest.spyOn(userService, 'registerUser').mockImplementation(() => {
            return 'test';
        });
        const user: UserRegisterDTO = {
            username: 'm.bechev',
            password: 'TainoObichamAzis',
            email: 'neshtosi@abv.bg',
            firstName: 'Martin',
            lastName: 'Bechev',
        };

        // // Act
        await usersCtrl.register(user);

        // Assert
        expect(userService.registerUser).toHaveBeenCalledTimes(1);
    });
});
