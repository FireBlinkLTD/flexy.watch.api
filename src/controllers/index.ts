import {Controller, Get} from "@tsed/common";

@Controller("/")
export class IndexController {

  @Get()
  findAll(): string {
    return "Flexy.Watch API";
  }
}
