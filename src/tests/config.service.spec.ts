import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../config/config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  beforeAll(async () => {
    service = new ConfigService();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
