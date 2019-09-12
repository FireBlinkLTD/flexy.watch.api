import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import {get} from "config";
import {IndexController} from "./controllers";
import {Client} from "pg";
import {DatabaseLogger} from "./loggers";
import {IDBConfig} from "./interfaces";
import {LoggerUtil} from "./utils";

const dbConfig = get<IDBConfig>("db");

@ServerSettings({
  acceptMimes: [
    "application/json",
  ],
  mount: {
    "/api": "controllers/(!index).js",
    "/": [
      IndexController,
    ]
  },
  componentsScan: [
    "services/**/*.js",
    "middlewares/**/*.js",
  ],
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
        `${__dirname}/entities/*.js`,
      ],
      migrations: [
        `${__dirname}/migrations/*.js`,
      ],
    }
  ],
  httpPort: 3000,
  httpsPort: false,
  swagger: [
    {
      cssPath: '${rootDir}/../spec/style.css',
      specPath: '${rootDir}/../spec/swagger.default.json',
      path: '/api-docs/v1',          
      doc: 'v1'
    }
  ]
})
export class App extends ServerLoader {

  public $onMountingMiddlewares(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

  public async $onInit(): Promise<any> {
    this.injector.logger = LoggerUtil.getLogger();

    const client = new Client({connectionString: dbConfig.url});
    await client.connect();
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${dbConfig.schema}"`);
    await client.end();
  }
}
