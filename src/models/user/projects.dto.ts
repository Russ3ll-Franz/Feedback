import { Allow } from 'class-validator';

export class AddProjectDTO {
    @Allow()
    projectName: string;

    @Allow()
    startDate: string;

    @Allow()
    endDate: string;

    @Allow()
    teamMembers: number;
}