import { AdminPanelService } from '../admin-panel/admin-panel.service';

describe('AdminPanelControler', () => {
  let adminPanelService: AdminPanelService;

  beforeEach(() => {
    adminPanelService = new AdminPanelService(null);
  });

  it('should call AdminPanelService changeUserRole method', async () => {
    // Arrange
    jest.spyOn(adminPanelService, 'changeUserRole');
    const user = {
      role: 'Admin',
      username: 'm.bechev',
    };

    // Act & Assert
    expect(adminPanelService.changeUserRole(user)).toReturn;
  });

  it('should call AdminPanelService getUserRole method', async () => {
    // Arrange
    jest.spyOn(adminPanelService, 'getUserRole');

    // Act & Assert
    expect(adminPanelService.getUserRole('m.bechevv')).toThrow;
  });
});
