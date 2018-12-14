import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Users } from './users.entity';
import { Roles } from './roles.entity';

@Entity({
    name: 'usersRoles',
})
export class UsersRoles {

    @PrimaryGeneratedColumn({
        name: 'userRoleID',
    })
    userRoleID: number;

    @ManyToOne(type => Users, users => users.users_roless, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'userID' })
    user: Users | null;

    @ManyToOne(type => Roles, roles => roles.users_roless, { nullable: false, onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'roleID' })
    role: Roles | null;

}
