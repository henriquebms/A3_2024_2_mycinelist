"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Log_1 = require("./Log");
var AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: true,
    entities: [Log_1.Log],
    subscribers: [],
    migrations: [],
});
AppDataSource.initialize()
    .then(function () { console.log('Database Connected'); })
    .catch(function (error) { return console.log(error); });
exports.default = AppDataSource;
