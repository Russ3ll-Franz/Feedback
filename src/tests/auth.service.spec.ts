import { UsersService } from './../common/core/users.service';
import { AuthService } from './../auth/auth.service';
import { Users } from '../data/entities/users.entity';
import { FeedbackDTO } from '../models/user/feedback.dto';
import { UserLoginDTO } from '../models/user/user-login.dto';

jest.mock('../common/core/users.service.ts'); // User Service

describe('Auth Service', () => {
    let authService: AuthService;
    let userService: UsersService;

    beforeEach(() => {
        userService = new UsersService(null);
        authService = new AuthService(userService, null);
    });

    it('should call signIn method', async () => {
        // Arrange
        jest.spyOn(authService, 'signIn');
        const user: UserLoginDTO = {
            username: 'm.bechev',
            password: 'TainoobichamAzis',
        };

        // Act & Assert
        expect(authService.signIn(user)).toReturn;
    });

    it('should call addNew method', async () => {
        // Arrange
        jest.spyOn(authService, 'validateUser').mockImplementation(() => {
            return 'test';
        });

        // Act & Assert
        expect(authService.validateUser(null)).toBe('test');
    });
});
