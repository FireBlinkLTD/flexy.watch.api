import {IAuthOptions} from "@tsed/common";

export interface IHeaderBasedAuthOptions extends IAuthOptions {
  role?: string;
}
