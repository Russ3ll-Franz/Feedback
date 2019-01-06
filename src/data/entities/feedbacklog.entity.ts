import { Users } from './users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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

    @Column('int', {
        nullable: false,

        name: 'teamID',
    })
    teamID: number;

    @ManyToOne(type => Users, users => users.received)
    reciever: Promise<Users>;

    @ManyToOne(type => Users, users => users.sent)
    sender: Promise<Users>;
}
