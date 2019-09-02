import {Logger, QueryRunner} from "typeorm"
import * as log4js from "log4js";

const logger = log4js.getLogger("database-logger");

export class DatabaseLogger implements Logger {

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): void {
    if (level === "log") {
      logger.debug(message);
    } else if (level === "info") {
      logger.info(message);
    } else {
      logger.warn(message);
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): void {
    logger.info(message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    logger.debug(`Executed SQL query: ${query}`);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    logger.error(`Failed SQL query execution: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    logger.warn(`Slow SQL query (${time} ms) execution: ${query}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): void {}
}
