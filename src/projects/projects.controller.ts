import { Teams } from './../data/entities/teams.entity';
import { AddProjectDTO } from './../models/user/projects.dto';
import { Controller, Get, Post, ValidationPipe, Body, Param, BadRequestException } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) { }

    @Get(':id')
    async getOne(@Param('id') id): Promise<any> {
        if (+id) {
            return this.projectService.getProject(id);
        }
        return new BadRequestException('Invalid team id');
    }

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
