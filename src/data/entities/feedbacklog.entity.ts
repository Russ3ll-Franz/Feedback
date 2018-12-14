import { Users } from './users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity({
    name: 'feedbackLog',
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
    @ManyToOne(type => Users, users => users.feedbacklog, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'receiverID' })
    receiver: Users | null;

    @ManyToOne(type => Users, users => users.feedbacklog2, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'senderID' })
    sender: Users | null;
}
