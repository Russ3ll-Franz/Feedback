import { Teams } from './../data/entities/teams.entity';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Teams)
        private readonly projectRepository: Repository<Teams>) { }

    async addProject(project) {
        const projectFound = await this.projectRepository.findOne({ where: { projectName: project.projectName } });
        if (projectFound) {
            throw new BadRequestException('There is already such project added!');
        }

        if (!project.projectName) {
            throw new BadRequestException('Project name cannot be null!');
        }

        if (!project.startDate) {
            throw new BadRequestException('Project start date cannot be null!');
        }

        if (!project.endDate) {
            throw new BadRequestException('Project end date cannot be null!');
        }

        if (!project.teamMembers) {
            throw new BadRequestException('Team members cannot be null!');
        }

        await this.projectRepository.create(project);

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
    async getProject(id): Promise<any> {
        try {
            return await this.projectRepository.findOneOrFail({ where: { teamID: id } });
        } catch (error) {
            return new HttpException(`Team with id:${id} was not found.`, 404);
        }
    }

    async getMembers(id): Promise<any> {
        const names = [];
        try {
            const team = await this.projectRepository.findOneOrFail({ where: { teamID: id } });
            await team.user.forEach((user) => {
                names.push(`${user.firstName} ${user.lastName} ${user.receivedFeedbacks} ${user.givenFeedbacks}`);
            });

            return names;
        } catch (error) {
            return new HttpException(`Team with id:${id} does not exist.`, 404);
        }
    }
}
