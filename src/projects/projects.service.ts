import { Users } from '../data/entities/users.entity';
import { ManageMembersDTO } from './../models/user/manage-members.dto';
import { AddProjectDTO } from './../models/user/projects.dto';
import { Teams } from './../data/entities/teams.entity';
import { Injectable, BadRequestException, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Teams)
        private readonly projectRepository: Repository<Teams>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectEntityManager()
        private entityManager: EntityManager,
        ) { }

    async addProject(project: AddProjectDTO, teamLead) {
        project.teamMembers = 0;
        try {
            const projectFound = await this.projectRepository.findOne({ where: { projectName: project.projectName } });

            if (projectFound) {
                throw new BadRequestException('There is already such project added!');
            }

            let createdProject: Teams;
            await this.entityManager.save(Teams, project).then(async (res) => {
                createdProject = await this.projectRepository.findOne({ where: { projectName: project.projectName } })
            });
            await this.entityManager.query(
                `INSERT INTO teams_team_lead_users (teamsTeamID, usersUserID) VALUES (${createdProject.teamID}, ${teamLead.user.userID})`,
            );
        } catch (error) {
            throw new BadRequestException(error);
        }

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
        try {
            const project = await this.projectRepository.findOneOrFail({ where: { teamID: +id } });
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

        } catch (error) {
            throw new BadRequestException(`Team with id:${id} was not found`);
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
            throw new BadRequestException('Check username',
                `User with username: ${memberInfo.username} does not exist or is not in team with id ${memberInfo.id}`);
        }

        return member;
    }

    async manageMembers(body: ManageMembersDTO, requestingUser): Promise<string> {
        let project: Teams;
        let user: Users;
        await this.usersRepository.findOneOrFail({ where: { username: body.teamMember } }).then((res) => {
            user = res;
        }).catch((err) => {
            throw new BadRequestException(`There is no user with username ${body.teamMember}`);
        });
        await this.projectRepository.findOneOrFail(body.teamID).then((res) => {
            project = res;
        }).catch((err) => {
            throw new BadRequestException(`There is no team with ID ${body.teamID}`);
        });
        const isTeamLead = await this.entityManager.query(`SELECT * FROM teams_team_lead_users WHERE usersUserID = ${requestingUser.user.userID}
        AND teamsTeamID = ${project.teamID};`);
        if (requestingUser.role !== 'Admin' && isTeamLead.length === 0){
            throw new UnauthorizedException('You are not the Team Lead of this team!');
        }

        const isUserMember = project.user.filter((u: Users) => {
            return u.username === user.username;
        });

        if (body.action === 'add'){
            if (isUserMember.length !== 0){
                throw new BadRequestException('The member you are trying to add is already in the team!');
            }
            await this.entityManager.query(
                `INSERT INTO teams_user_users (teamsTeamID, usersUserID) VALUES (${project.teamID}, ${user.userID})`,
            );
            await this.projectRepository.update({teamID: project.teamID}, { teamMembers: project.teamMembers + 1 });
            // const newProject: Teams = project;
            // newProject.user.push(user);
            // newProject.teamMembers = newProject.teamMembers + 1;
            // this.entityManager.update(Teams, { user: project.user }, { user: newProject.user });
            return `Successfully added user ${user.username} to project ${project.projectName}`;
        }

        if (body.action === 'remove'){
            if (isUserMember.length === 0){
                throw new BadRequestException('There is no such member in the team you have specified!');
            }
            if (project.user.length === 0){
                throw new BadRequestException(`The team is empty!`);
            }
            await this.entityManager.query(
                `DELETE FROM teams_user_users WHERE teamsTeamID = ${project.teamID} AND usersUserID = ${user.userID} limit 1`,
            );
            await this.projectRepository.update({teamID: project.teamID}, { teamMembers: project.teamMembers - 1 });
            // const newProject: Teams = project;

            // newProject.user = newProject.user.filter((u: Users) => {
            //     return u !== user;
            // });

            // newProject.teamMembers = newProject.teamMembers - 1;
            // this.projectRepository.update({ user: project.user }, { user: newProject.user});
            return `Successfully removed user ${user.username} to project ${project.projectName}`;
        }

        return 'How did you manage to do this? Report to the creators the error and the path.';
    }
}
