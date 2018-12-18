import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './users.entity';
@Entity({
    name: 'teams'
    ,
})
export class Teams {

    @PrimaryGeneratedColumn({
        name: 'teamID',
    })
    teamID: number;

    @Column('varchar', {
        nullable: false,
        length: 40,

        name: 'projectName',
    })
    projectName: string;

    @Column('date', {
        nullable: false,

        name: 'startDate',
    })
    startDate: string;

    @Column('date', {
        nullable: false,

        name: 'endDate',
    })
    endDate: string;

    @Column('int', {
        nullable: false,

        name: 'teamMembers',
    })
    teamMembers: number;

    @ManyToMany(type => Users)
    @JoinTable()
    user: Users[];

    @ManyToMany(type => Users)
    @JoinTable()
    teamLead: Users[];
}
