import * as jmEzMySql from "jm-ez-mysql";
import { Constants } from "./config/constants";
export class DB {
    public static init() {
        jmEzMySql.init({
            acquireTimeout: 100 * 60 * 1000,
            connectTimeout: 100 * 60 * 1000,
            connectionLimit: 10000,
            database: process.env.DATABASE,
            dateStrings: true,
            host: process.env.DBHOST,
            multipleStatements: true,
            password: process.env.DBPASSWORD,
            timeout: 100 * 60 * 1000,
            timezone: "utc",
            user: process.env.DBUSER,
            charset: Constants.DB_DEFAULTS.CHARSET,
            collation: Constants.DB_DEFAULTS.COLLATION
        });
    }
}
