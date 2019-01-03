import { Test, TestingModule } from '@nestjs/testing';
import { AdminPanelService } from '../admin-panel/admin-panel.service';

describe('AdminPanelService', () => {
  let service: AdminPanelService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminPanelService],
    }).compile();
    service = module.get<AdminPanelService>(AdminPanelService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
