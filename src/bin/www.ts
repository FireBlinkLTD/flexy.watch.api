import * as log4js from "log4js";
import * as config from "config";
import {App} from "../app";

const log4jsConfig: any = config.get('log4js');

log4js.configure(log4jsConfig);

const logger = log4js.getLogger("bin/www");
const app = new App();

async function bootstrap(): Promise<void> {
  try {
    await app.start();
    logger.info("Server started...");
  } catch (e) {
    logger.error("Server closed: " + e);
  }
}

bootstrap();
