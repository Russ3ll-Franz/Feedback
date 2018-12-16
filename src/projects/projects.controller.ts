import { Teams } from './../data/entities/teams.entity';
import { AddProjectDTO } from './../models/user/projects.dto';
import { Controller, Get, UseGuards, Post, ValidationPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) { }

    @Get()
    getAllProjects(): Promise<Teams[]> {
        return this.projectService.findAll();
    }

    @Post('new')
    async addProject(
        @Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    }))
    project: AddProjectDTO): Promise<string> {

        try {
            await this.projectService.addProject(project);
            return 'Project added in database';
        } catch (error) {
            return (error.message);
        }
    }
}
