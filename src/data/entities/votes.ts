import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users';
import {Teams } from './teams';

@Entity('votes')
// @Index("fk_teams_votes",["team",])
// @Index("fk_users_votes",["user",])
export class Votes {

    @PrimaryGeneratedColumn({
        name: 'voteID',
    })
    voteID: number;

    @ManyToOne(type => Users, users => users.votess, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'userID' })
    user: Users | null;

    @ManyToOne(type => Teams, teams => teams.votess, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'teamID' })
    team: Teams | null;

    @Column('int', {
        nullable: false,
        name: 'numberOfVotes',
    })
    numberOfVotes: number;

}
