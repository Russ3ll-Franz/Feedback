
import { IsString, Matches } from 'class-validator';

export class ManageMembersDTO {
    @IsString()
    @Matches(/^(add)$|^(remove)$/)
    action: string;

    @IsString()
    teamMember: string;

    @IsString()
    @Matches(/^([0-9]{1,})$/)
    teamID: string;
}
