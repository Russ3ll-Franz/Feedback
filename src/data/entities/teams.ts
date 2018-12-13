import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsersTeams } from './users_teams';
import { Votes } from './votes';

@Entity('teams')
export class Teams {

    @PrimaryGeneratedColumn({
        name: 'teamID',
    })
    teamID: number;

    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'projectName',
    })
    projectName: string;

    @Column('date', {
        nullable: false,
        name: 'startDate',
    })
    startDate: string;

    @Column('date', {
        nullable: false,
        name: 'endDate',
    })
    endDate: string;

    @Column('int', {
        nullable: false,
        name: 'teamMembers',
    })
    teamMembers: number;

    @OneToMany(type => UsersTeams, users_teams => users_teams.team, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    users_teamss: UsersTeams[];

    @OneToMany(type => Votes, votes => votes.team, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    votess: Votes[];

}
