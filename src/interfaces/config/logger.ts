import {ICategoriesConfig} from "./categories";
import {IAppendersConfig} from "./appenders";

export interface ILoggerConfig {
  appenders: IAppendersConfig;
  categories: ICategoriesConfig;
}
