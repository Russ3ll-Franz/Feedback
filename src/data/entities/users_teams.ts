import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users';
import { Teams } from './teams';

@Entity('users_teams')
// @Index("fk_teams",["team",])
// @Index("fk_users",["user",])
export class UsersTeams {

    @PrimaryGeneratedColumn({
        name: 'user_teamID',
    })
    user_teamID: number;

    @ManyToOne(type => Users, users => users.users_teamss, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'userID' })
    user: Users | null;

    @ManyToOne(type => Teams, teams => teams.users_teamss, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'teamID' })
    team: Teams | null;

}
