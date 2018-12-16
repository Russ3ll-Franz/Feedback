import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './users.entity';
@Entity({
    name: 'roles'
    ,
})
export class Roles {

    @PrimaryGeneratedColumn({
        name: 'rolesID',
    })
    rolesID: number;

    @Column('varchar', {
        nullable: false,
        length: 10,

        name: 'role',
    })
    role: string;

    @ManyToMany(type => Users, user => user.role)
    @JoinTable()
    user: Users[];
}
