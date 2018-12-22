import { Teams } from './teams.entity';
import { Users } from './users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity({
    name: 'feedbacklog',
})
export class Feedbacklog {

    @PrimaryGeneratedColumn({
        name: 'feedbacklogID',
    })
    feedbacklogID: number;

    @Column('varchar', {
        nullable: false,
        length: 1000,
        name: 'feedback',
    })
    feedback: string;

    @ManyToOne(type => Users, users => users.received)
    receiver: Users | null;

    @ManyToOne(type => Users, users => users.sent)
    sender: Users | null;

    @ManyToMany(type => Teams)
    @JoinTable()
    Feedbacklog: Feedbacklog;
}
