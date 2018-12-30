import { AuthGuard } from '@nestjs/passport';
import { Teams } from './../data/entities/teams.entity';
import { AddProjectDTO } from './../models/user/projects.dto';
import { Controller, Get, Post, Body, Param, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Roles } from 'src/common';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) { }

    @Get()

    getAllProjects(): Promise<Teams[]> {
        return this.projectService.findAll();
    }
    @Get()

    @Roles('Team Lead', 'Admin', 'User')
    @UseGuards(AuthGuard(), RolesGuard)
    // projects?id=1&username=m.bechev
    async memberFeedbacklog(@Query() memberInfo): Promise<any> {
        if ((+memberInfo.id) && !(+memberInfo.username)) {
            return this.projectService.getMemberFeedbacklog(memberInfo);
        }
        throw new BadRequestException('Invalid project id or username');
    }


    @Get(':id')

    @Roles('Team Lead', 'Admin', 'User')
    @UseGuards(AuthGuard(), RolesGuard)
    async getOne(@Param('id') id): Promise<any> {
        if (+id) {
            return this.projectService.getProject(id);
        }
        throw new BadRequestException('Invalid team id');
    }

    @Get(':id/members')

    @Roles('Team Lead', 'Admin', 'User')
    @UseGuards(AuthGuard(), RolesGuard)
    async showMembers(@Param('id') id): Promise<any> {
        if (+id) {
            return this.projectService.getMembers(id);
        }
        throw new BadRequestException('Invalid team id');
    }

    @Post('new')

    @Roles('Team Lead', 'Admin')
    @UseGuards(AuthGuard(), RolesGuard)
    async addProject(@Body() project: AddProjectDTO): Promise<string> {
        await this.projectService.addProject(project);
        return 'Project added in database';
    }
}
