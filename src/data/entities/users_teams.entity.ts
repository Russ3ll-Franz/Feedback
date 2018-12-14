import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users.entity';
import { Teams } from './teams.entity';

@Entity({
    name: 'usersTeams',
})
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
