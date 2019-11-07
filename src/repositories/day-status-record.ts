import {TypeORMService} from "@tsed/typeorm";
import {InsertResult, Repository} from "typeorm";
import {Injectable} from "@tsed/di";
import {AfterRoutesInit} from "@tsed/common";
import {DayStatusRecord} from "../entities";

@Injectable()
export class DayStatusRecordRepository implements AfterRoutesInit {
  private repository: Repository<DayStatusRecord>;

  constructor(private typeORMService: TypeORMService) {}

  $afterRoutesInit() {
    this.repository = this.typeORMService.get().manager.getRepository(DayStatusRecord);
  }

  public findAll(): Promise<DayStatusRecord[]> {
    return this.repository.find();
  }

  public create(record: DayStatusRecord): Promise<InsertResult> {
    return this.repository.insert(record);
  }
}
