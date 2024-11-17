import { DataSource } from "typeorm";
import { Log } from "../models/logs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.host,
    port: Number(process.env.port),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Log],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log('conectado')
    })
    .catch((error) => console.log(error))