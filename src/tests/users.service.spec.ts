import { UsersService } from '../common/core/users.service';

describe('Users Service', () => {
    let usersService: UsersService;
    let user = {};
    beforeEach(() => {
        usersService = new UsersService(null);
        user = {
            username: 'm.bechev',
            password: 'TainoObichamAzis',
            email: 'neshtosi@abv.bg',
            firstName: 'Martin',
            lastName: 'Bechev',
        };
    });

    it('should call registerUser method', async () => {
        // Arrange
        jest.spyOn(usersService, 'registerUser');

        // Act & Assert
        expect(usersService.registerUser(user)).toReturn;
    });

    it('should call getUser method', async () => {
        // Arrange
        jest.spyOn(usersService, 'getUser');

        // Act & Assert
        expect(usersService.getUser(user)).toReturn;
    });
});
