import { AuthModule } from './../auth/auth.module';
import { CoreModule } from './../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from 'src/data/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), CoreModule, AuthModule],
  providers: [],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
