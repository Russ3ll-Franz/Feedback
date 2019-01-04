import { AdminPanelController } from '../admin-panel/admin-panel.controller';
import { AdminPanelService } from '../admin-panel/admin-panel.service';

jest.mock('../admin-panel/admin-panel.service');

describe('AdminPanelControler', () => {
  let adminPanelService: AdminPanelService;
  let adminPanelCtrl: AdminPanelController;

  beforeEach(() => {
    adminPanelService = new AdminPanelService(null);
    adminPanelCtrl = new AdminPanelController(adminPanelService);
  });

  it('should call AdminPanelService changeUserRole method', async () => {
    // Arrange
    jest.spyOn(adminPanelService, 'changeUserRole').mockImplementation(() => {
      return 'test';
    });
    const user = {
      role: 'Admin',
      username: 'm.bechev',
    };

    // Act
    await adminPanelCtrl.changeRole(user);

    // Assert
    expect(adminPanelService.changeUserRole).toHaveBeenCalledTimes(1);
  });

  it('should call AdminPanelService getUserRole method', async () => {
    // Arrange
    jest.spyOn(adminPanelService, 'getUserRole').mockImplementation(() => {
      return 'test';
    });

    // Act
    await adminPanelCtrl.getRole('');

    // Assert
    expect(adminPanelService.getUserRole).toHaveBeenCalledTimes(1);
  });
});