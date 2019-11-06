import {EndpointInfo, IMiddleware, Middleware, Req, HeaderParams} from "@tsed/common";
import {Forbidden, Unauthorized} from "ts-httpexceptions";

@Middleware()
export class HeaderBasedAuthMiddleware implements IMiddleware {

  public use(
    @HeaderParams("x-auth-roles") roles: string,
    @HeaderParams("x-auth-username") username: string,
    @Req() request: Express.Request & { [key: string]: any },
    @EndpointInfo() endpoint: EndpointInfo,
  ): void {
    const options = endpoint.get(HeaderBasedAuthMiddleware);

    if (!username || !username.length) {
      request.log.warn({
        type: "auth",
        message: "X-Auth-Username header is missing or has empty value",
      });

      throw new Unauthorized("Unauthorized");
    }

    request.username = username;

    if (options.role) {
      if (!roles || !roles.length) {
        request.log.warn({
          type: "auth",
          message: "X-Auth-Roles header is missing or has empty value",
        });

        throw new Unauthorized("Unauthorized");
      }

      if (roles.split(",").includes(options.role)) {
        throw new Forbidden("Forbidden");
      }
    }
  }
}
