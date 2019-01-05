import { JwtPayload } from './../interfaces/jwt-payload';
import { UsersService } from '../common/core/users.service';
import { UserLoginDTO } from '../models/user/user-login.dto';

describe('Users Service', () => {
    let usersService: UsersService;
    let userRepository: any;
    beforeEach(() => {
        userRepository = {
            findOne: () => { },
            findOneOrFail: () => { },
        };
        usersService = new UsersService(userRepository);
    });

    it('should call userRepository findOne method from registerUser method', () => {
        // Arrange
        jest.spyOn(userRepository, 'findOne');

        // Act
        usersService.registerUser('');

        // Assert
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should call userRepository findOneOrFail method from getUser method', () => {
        // Arrange
        jest.spyOn(userRepository, 'findOneOrFail');

        // Act
        usersService.getUser('');

        // Assert
        expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should call userRepository findOne method from signIn method', () => {
        // Arrange
        jest.spyOn(userRepository, 'findOne');
        const user: UserLoginDTO = {
            username: '',
            password: '1032',
        };

        // Act
        usersService.signIn(user);

        // Assert
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should call userRepository findOne method from validateUser method', () => {
        // Arrange
        jest.spyOn(userRepository, 'findOne');
        const payload: any = {};
        // Act
        usersService.validateUser(payload);

        // Assert
        expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
});
