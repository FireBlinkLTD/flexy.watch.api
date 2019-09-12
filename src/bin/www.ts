import {$log} from "ts-log-debug";
import {App} from "../app";
import {LoggerUtil} from "../utils";

const logger = LoggerUtil.getLogger("bin/www");
const app = new App();

async function bootstrap(): Promise<void> {
  try {
    await app.start();
    logger.info("Server started...");
  } catch (e) {
    logger.error("Server closed: " + e);
    await $log.shutdown();
  }
}

bootstrap();
