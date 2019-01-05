import { JwtPayload } from './../interfaces/jwt-payload';
import { UsersService } from './../common/core/users.service';
import { AuthService } from './../auth/auth.service';
import { Users } from '../data/entities/users.entity';
import { FeedbackDTO } from '../models/user/feedback.dto';
import { UserLoginDTO } from '../models/user/user-login.dto';

jest.mock('../common/core/users.service.ts'); // User Service

describe('Auth Service', () => {
    let userService: UsersService;
    let authService: AuthService;
    beforeEach(() => {

        userService = new UsersService(null);
        authService = new AuthService(userService, null);
    });

    it('should call userService signIn method from signIn method', () => {
        // Arrange
        jest.spyOn(userService, 'signIn');
        const user: UserLoginDTO = {
            username: 'm.bechev',
            password: 'TainoobichamAzis',
        };

        // Act
        authService.signIn(user);

        // Assert
        expect(userService.signIn).toHaveBeenCalledTimes(1);
    });

    it('should call usersService validateUser method from validateUser method', () => {
        // Arrange
        jest.spyOn(userService, 'validateUser').mockImplementation(() => {
            return 'test';
        });
        const payload: JwtPayload = { email: '', username: '' };

        // Act
        authService.validateUser(payload);

        // Assert
        expect(userService.validateUser).toHaveBeenCalledTimes(1);
    });
});
