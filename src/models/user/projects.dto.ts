
import { IsString, Matches, IsNumber } from 'class-validator';

export class AddProjectDTO {
    @IsString()
    projectName: string;
    @Matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
    startDate: string;
    @Matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
    endDate: string;
    @Matches(/(?=[0-9])/)
    teamMembers: number;
}
