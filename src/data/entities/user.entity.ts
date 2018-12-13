import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column()
    avatarUrl: string;

    @Column({ default: false })
    isAdmin: boolean;
}
