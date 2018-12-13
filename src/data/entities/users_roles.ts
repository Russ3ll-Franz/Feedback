import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './users';
import { Roles } from './roles';

@Entity('users_roles')
// @Index("fk_role",["role",])
// @Index("fk_user",["user",])
export class UsersRoles {

    @PrimaryGeneratedColumn({
        name: 'userRoleID',
    })
    userRoleID: number;

    @ManyToOne(type => Users, users => users.users_roless, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userID' })
    user: Users | null;

    @ManyToOne(type => Roles, roles => roles.users_roless, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'roleID' })
    role: Roles | null;

}
