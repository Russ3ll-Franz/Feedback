import { ProjectsController } from './projects.controller';
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Teams } from 'src/data/entities/teams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Teams]), AuthModule],
    providers: [ProjectsService],
    controllers: [ProjectsController],
  })
export class ProjectsModule {}
