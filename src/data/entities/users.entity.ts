import { Teams } from './teams.entity';
import { Feedbacklog } from './feedbacklog.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity({
    name: 'users',
})
export class Users {

    @PrimaryGeneratedColumn({
        name: 'userID',
    })
    userID: number;

    @Column('varchar', {
        nullable: true,

        length: 100,
        name: 'email',
    })
    email: string;

    @Column('varchar', {
        nullable: true,

        length: 200,
        name: 'password',
    })
    password: string;

    @Column('varchar', {
        nullable: true,
        length: 20,

        name: 'username',
    })
    username: string;

    @Column('varchar', {
        nullable: true,
        length: 35,

        name: 'firstName',
    })
    firstName: string;

    @Column('varchar', {
        nullable: true,
        length: 35,

        name: 'lastName',
    })
    lastName: string | null;

    @Column('int', {
        nullable: true,

        name: 'receivedFeedbacks',
    })
    receivedFeedbacks: number;

    @Column('int', {
        nullable: true,

        name: 'givenFeedbacks',
    })
    givenFeedbacks: number;

    @Column('varchar', {
        nullable: false,
        default: 'User',
        name: 'role',
    })
    role: string;

    @ManyToMany(type => Teams, team => team.user)
    team: Teams[];
    @OneToMany(type => Feedbacklog, feedbacklog => feedbacklog.receiver)
    feedbacklog: Feedbacklog[];

    @OneToMany(type => Feedbacklog, feedbacklog => feedbacklog.sender)
    feedbacklog2: Feedbacklog[];
}
