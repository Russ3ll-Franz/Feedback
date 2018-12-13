import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsersRoles } from './users_roles';
import { UsersTeams } from './users_teams';
import { Votes } from './votes';

@Entity('users')
export class Users {

    @PrimaryGeneratedColumn({
        name: 'userID',
    })
    userID: number;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'username',
    })
    username: string;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'firstName',
    })
    firstName: string;

    @Column('varchar', {
        nullable: true,
        length: 45,
        default: 'NULL',
        name: 'lastName',
    })
    lastName: string | null;

    @Column('varchar', {
        nullable: false,
        length: 150,
        name: 'password',
    })
    password: string;

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'email',
    })
    email: string;

    @OneToMany(type => UsersRoles, users_roles => users_roles.user, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    users_roless: UsersRoles[];

    @OneToMany(type => UsersTeams, users_teams => users_teams.user, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    users_teamss: UsersTeams[];

    @OneToMany(type => Votes, votes => votes.user, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    votess: Votes[];

}
