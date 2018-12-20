import { AddProjectDTO } from './../models/user/projects.dto';
import { Teams } from './../data/entities/teams.entity';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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
            return new BadRequestException('There is already such project added!');
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
            return new BadRequestException('Check project id', `Team with id:${id} does not exist.`);
        }
    }
}
