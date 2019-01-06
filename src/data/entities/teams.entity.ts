import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './users.entity';
@Entity({
    name: 'teams',
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
        default: 0,

        name: 'teamMembers',
    })
    teamMembers: number;

    @ManyToMany(type => Users, {
        eager: true,
    })
    @JoinTable()
    user: Users[];

    @ManyToMany(type => Users)
    @JoinTable()
    teamLead: Users[];
}
