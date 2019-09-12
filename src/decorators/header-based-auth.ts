import {UseAuth} from "@tsed/common";
import {applyDecorators} from "@tsed/core";
import {HeaderBasedAuthMiddleware} from "../middlewares";
import {IHeaderBasedAuthOptions} from "../interfaces";

export function HeaderBasedAuth(options: IHeaderBasedAuthOptions = {}): Function {
  const decorators = [
    UseAuth(HeaderBasedAuthMiddleware, options),
  ];

  return applyDecorators(...decorators);
}
