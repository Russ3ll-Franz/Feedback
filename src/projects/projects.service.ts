import { FileService } from './../common/core/file.service';
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
            throw new BadRequestException('There is already such project added!');
        }

        await this.projectRepository.create(project);
        const result = await this.projectRepository.save([project]);
        return result;
    }

    async findAll() {
        try {
            const projects = await this.projectRepository.find();

            const projectsInfo = projects.map((project) => {
                const info = {
                    projectName: project.projectName,
                    teamMembers: project.teamMembers,
                    users: project.user.map((user) => {
                        return `${user.firstName} ${user.lastName} - ${user.email}`;
                    }),
                };
                return info;
            });
            return projectsInfo;
        } catch (error) {
            throw new BadRequestException(`No teams to show`);
        }
    }
    async getProject(id): Promise<any> {
        let project;
        try {
            project = await this.projectRepository.findOneOrFail({ where: { teamID: +id } });

        } catch (error) {
            throw new BadRequestException(`Team with id:${id} was not found`);
        }
        const projectsInfo = {
            projectName: project.projectName,
            teamMembers: project.teamMembers,
            startDate: project.startDate,
            endDate: project.endDate,
            users: project.user.map((user) => {
                return `${user.firstName} ${user.lastName} - ${user.email}`;
            }),
        };
        return projectsInfo;
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
            throw new BadRequestException('Check project id', `Team with id:${id} does not exist.`);
        }
    }

    async getMemberFeedbacklog(memberInfo): Promise<any> {
        let team: Teams;
        try {
            team = await this.projectRepository.findOneOrFail({ where: { teamID: +memberInfo.id } });
        } catch (error) {
            throw new BadRequestException('Check project id', `Team with id:${memberInfo.id} does not exist.`);
        }

        let member = {};
        await team.user.forEach((user) => {
            if (user.username === memberInfo.username) {
                member = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    received: user.received.map((info) => {
                        return {
                            feedback: info.feedback,
                            teamID: info.teamID,
                        };
                    }),
                    sent: user.sent.map((info) => {
                        return {
                            feedback: info.feedback,
                            teamID: info.teamID,
                        };
                    }),
                };
            }
        });

        if (Object.keys(member).length === 0) {
            throw new BadRequestException('Check username', `User with username:${memberInfo.username} does not exist.`);
        }

        return member;
    }
}