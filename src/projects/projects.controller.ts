import { AuthGuard } from '@nestjs/passport';
import { Teams } from './../data/entities/teams.entity';
import { AddProjectDTO } from './../models/user/projects.dto';
import { Controller, Get, Post, Body, Param, BadRequestException, Request, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Roles } from '../common';
import { RolesGuard } from '../common/guards/roles/roles.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) { }

    @Get()

    @Roles('Team Lead', 'Admin', 'User')
    @UseGuards(AuthGuard(), RolesGuard)
    // projects?id=1&username=m.bechev
    async memberFeedbacklog(@Query() memberInfo, @Request() req): Promise<any> {
        if (req.user.username !== memberInfo.username && req.user.role !== 'Admin' && req.user.role !== 'Team Lead'){
            throw new BadRequestException('You are only allowed to see your feedbacks!')
        }
        if ((+memberInfo.id) && !(+memberInfo.username)) {
            return this.projectService.getMemberFeedbacklog(memberInfo);
        }
        throw new BadRequestException('Invalid project id or username');
    }

    @Get('all')
    @Roles('Team Lead', 'Admin', 'User')
    @UseGuards(AuthGuard(), RolesGuard)
    getAllProjects(): any {
        return this.projectService.findAll();
    }

    @Get(':id')

    @Roles('Team Lead', 'Admin', 'User')
    @UseGuards(AuthGuard(), RolesGuard)
    async getOne(@Param() params) {
        if (+params.id) {
            return await this.projectService.getProject(params.id).catch(() => {
                throw new BadRequestException(`Invalid team id ${params.id}`);
            });
        }
        throw new BadRequestException(`Invalid team id ${params.id}`);
    }

    @Get(':id/members')

    @Roles('Team Lead', 'Admin', 'User')
    @UseGuards(AuthGuard(), RolesGuard)
    async showMembers(@Param('id') id: string): Promise<any> {
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
