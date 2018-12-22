import { Teams } from './../data/entities/teams.entity';
import { AddProjectDTO } from './../models/user/projects.dto';
import { Controller, Get, Post, Body, Param, BadRequestException, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) { }

    @Get()
    // Should be protected with properly rights
    // projects?id=1&username=m.bechev
    async memberFeedbacklog(@Query() memberInfo): Promise<any> {
        if ((+memberInfo.id) && !(+memberInfo.username)) {
            return this.projectService.getMemberFeedbacklog(memberInfo);
        }
        throw new BadRequestException('Invalid project id or username');
    }

    // Should be protected with properly rights
    @Get(':id')
    async getOne(@Param('id') id): Promise<any> {
        if (+id) {
            return this.projectService.getProject(id);
        }
        throw new BadRequestException('Invalid team id');
    }

    @Get(':id/members')
    // Should be protected with properly rights
    async showMembers(@Param('id') id): Promise<any> {
        if (+id) {
            return this.projectService.getMembers(id);
        }
        throw new BadRequestException('Invalid team id');
    }

    @Get()
    getAllProjects(): Promise<Teams[]> {
        return this.projectService.findAll();
    }

    @Post('new')
    // Should be protected with properly rights
    async addProject(@Body() project: AddProjectDTO): Promise<string> {
        try {
            await this.projectService.addProject(project);
            return 'Project added in database';
        } catch (error) {
            return 'Invalid input fields';
        }
    }
}
