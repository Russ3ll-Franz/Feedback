import { Teams } from './teams.entity';
import { Users } from './users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity({
    name: 'feedbacklog',
})
export class Feedbacklog {

    @PrimaryGeneratedColumn({
        name: 'feedbackLogID',
    })
    feedbackLogID: number;

    @Column('varchar', {
        nullable: false,
        length: 1000,
        name: 'feedback',
    })
    feedback: string;
    @ManyToOne(type => Users, users => users.feedbacklog)
    receiver: Users | null;

    @ManyToOne(type => Users, users => users.feedbacklog2)
    sender: Users | null;

    @ManyToMany(type => Teams)
    @JoinTable()
    Feedbacklog: Feedbacklog;
}
