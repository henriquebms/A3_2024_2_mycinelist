import { injectable } from "inversify";
import { Repository as AppRepository } from ".";
import { AppDataSource } from "../config/connection";
import { Repository } from "typeorm";
import { Log } from "../models/logs";

@injectable()
export class LogRepository {
    
    repository: Repository<Log>;

    constructor () {
        this.repository = AppDataSource.getRepository(Log);
    }

    async save (data: Log) {
        return await this.repository.save(new Log(data));
    };
}