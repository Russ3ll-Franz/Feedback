import { ChangeRoleDTO } from '../models/adminpanel/change-role.dto';
import { AdminPanelService } from '../admin-panel/admin-panel.service';

describe('AdminPanelService', () => {
  let adminPanelService: AdminPanelService;
  let usersRepository: any;

  beforeEach(() => {
    usersRepository = {
      findOne: () => { },
      findOneOrFail: () => { },
    };
    adminPanelService = new AdminPanelService(usersRepository);
  });

  it('should call usersRepository findOne method from changeUserRole method', async () => {
    // Arrange
    jest.spyOn(usersRepository, 'findOne');
    const user: ChangeRoleDTO = {
      role: 'Admin',
      username: 'm.bechev',
    };

    // Act
    adminPanelService.changeUserRole(user);

    // Assert
    expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call usersRepository findOneOrFail method from getUserRole method', async () => {
    // Arrange
    jest.spyOn(usersRepository, 'findOneOrFail');

    // Act
    adminPanelService.getUserRole('');

    // Assert
    expect(usersRepository.findOneOrFail).toHaveBeenCalledTimes(1);
  });
});
