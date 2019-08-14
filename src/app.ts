import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as bodyParser from "body-parser";
import {IndexController} from "./controllers";
import RequestLoggerMiddleware from "./middlewares/request-logger";

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
  httpPort: 3000
})
export class App extends ServerLoader {

  public $onMountingMiddlewares(): void|Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(RequestLoggerMiddleware)
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}
