import {Logger} from "ts-log-debug";
import {get} from "config";
import {ILoggerConfig} from "../interfaces";

const loggerConfig = get<ILoggerConfig>("logger");

export class LoggerUtil {

  public static getLogger(category: string = "default"): Logger {
    const logger = new Logger(category);
    const categoryConfig = loggerConfig.categories[category];

    logger.level = categoryConfig.level;

    for (const appender of Object.keys(loggerConfig.appenders)) {
      const appenderConfig = loggerConfig.appenders[appender];

      logger.appenders.set(appender, {...appenderConfig});
    }

    return logger;
  }
}
