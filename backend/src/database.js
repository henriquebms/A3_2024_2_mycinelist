import { DataSource } from "typeorm";
import Log from "./log.entity.js";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: 'postgres',
    password: '',
    database: '',
    logging: false,
    entities: [Log],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => { console.log('Database Connected') })
    .catch((error) => console.log(error))

export default AppDataSource