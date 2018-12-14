import { AuthModule } from './../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { CoreModule } from './../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// import { User } from '../data/entities/test.entity';
import { UsersController } from './users.controller';
import { Users } from 'src/data/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), CoreModule, AuthModule],
  providers: [],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
