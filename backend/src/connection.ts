import { DataSource } from "typeorm";
import { LoggIA } from "./Log";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: true,
    entities: [LoggIA],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => { console.log('Database Connected') })
    .catch((error) => console.log(error))

export default AppDataSource