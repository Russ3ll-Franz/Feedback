import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelController } from '../admin-panel/admin-panel.controller';

describe('AdminPanel Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AdminPanelController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AdminPanelController = module.get<AdminPanelController>(AdminPanelController);
    expect(controller).toBeDefined();
  });
});
