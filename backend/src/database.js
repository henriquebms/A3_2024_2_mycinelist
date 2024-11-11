import { DataSource } from "typeorm";
import Log from "./log.entity.js";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    entities: [Log],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => { console.log('Database Connected') })
    .catch((error) => console.log(error))

export default AppDataSource