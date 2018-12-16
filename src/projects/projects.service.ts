import { AddProjectDTO } from './../models/user/projects.dto';
import { Teams } from './../data/entities/teams.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Teams)
        private readonly projectRepository: Repository<Teams>) { }

    async addProject(project: AddProjectDTO) {
        const projectFound = await this.projectRepository.findOne({ where: { projectName: project.projectName } });
        if (projectFound) {
            throw new BadRequestException('There is already such project added!');
        }

        await this.projectRepository.create(project);

        project.projectName = project.projectName;
        project.startDate = project.startDate;
        project.endDate = project.endDate;
        project.teamMembers = +project.teamMembers;
        const result = await this.projectRepository.save([project]);

        return result;
    }

    async findAll(): Promise<Teams[]> {
        try {
            return await this.projectRepository.find();
        } catch (error) {
            return error;
        }
    }
}
