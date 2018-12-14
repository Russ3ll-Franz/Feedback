import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsersRoles } from './users_roles.entity';

@Entity({
    name: 'roles',
})
export class Roles {

    @PrimaryGeneratedColumn({
        name: 'roleID',
    })
    roleID: number;

    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'roleName',
    })
    roleName: string;

    @OneToMany(type => UsersRoles, users_roles => users_roles.role, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    users_roless: UsersRoles[];

}
