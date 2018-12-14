import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
// import { User } from '../../data/entities/test.entity';
import { FileService } from './file.service';
import { Users } from 'src/data/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService, FileService],
  exports: [UsersService, FileService],
})
export class CoreModule { }
