import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as config from "config";
import {IndexController} from "./controllers";
import RequestLoggerMiddleware from "./middlewares/request-logger";
import {Client} from "pg";
import {DatabaseLogger} from "./lib/database-logger";

const dbConfig = config.get<{url: string, schema: string}>("db");

@ServerSettings({
  acceptMimes: ["application/json"],
  mount: {
    "/api": "controllers/(!index).js",
    "/": [
      IndexController
    ]
  },
  componentsScan: [
    "services/**/*.js",
    "middlewares/**/*.js"
  ],
  logger: {
    logRequest: false,
    disableRoutesSummary: true
  },
  typeorm: [
    {
      name: "default",
      type: "postgres",
      url: dbConfig.url,
      schema: dbConfig.schema,
      migrationsRun: true,
      synchronize: false,
      logger: new DatabaseLogger(),
      entities: [
        `${__dirname}/entity/*.js`
      ],
      migrations: [
        `${__dirname}/migrations/*.js`
      ]
    }
  ],
  httpPort: 3000
})
export class App extends ServerLoader {

  public $onMountingMiddlewares(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(RequestLoggerMiddleware)
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

  public async $onInit(): Promise<any> {
    const client = new Client({connectionString: dbConfig.url});
    await client.connect();
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${dbConfig.schema}"`);
    await client.end();
  }
}
