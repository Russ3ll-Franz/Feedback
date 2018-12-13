import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feedbacklog')
export class Feedbacklog {

    @PrimaryGeneratedColumn({
        name: 'feedbackLogID',
    })
    feedbackLogID: number;

    @Column('int', {
        nullable: false,
        name: 'senderID',
    })
    senderID: number;

    @Column('int', {
        nullable: false,
        name: 'receiverID',
    })
    receiverID: number;

    @Column('int', {
        nullable: false,
        name: 'teamID',
    })
    teamID: number;

    @Column('varchar', {
        nullable: false,
        length: 1000,
        name: 'feedback',
    })
    feedback: string;

}
