import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'logs' })
export class Log {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    question: string = '';

    @Column()
    response: string = '';

    @Column()
    createdAt: string = '';

    constructor (user: Log) {
        Object.assign(this, user);
    }

}