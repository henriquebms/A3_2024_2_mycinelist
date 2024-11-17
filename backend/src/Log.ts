import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('ia_logs')
export class LoggIA {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({  })
    question: string = ''

    @Column()
    response: string = ''

    @Column()
    createdAt: string = new Date().toISOString()

    constructor (data: Partial<LoggIA>) {
        Object.assign(this, data);
    }
}