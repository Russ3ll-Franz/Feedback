import { AdminPanelController } from './admin-panel.controller';
import { Module } from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/data/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AdminPanelService],
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  exports: [],
  controllers: [AdminPanelController],

})
export class AdminPanelModule {}
