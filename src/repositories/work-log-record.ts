import {TypeORMService} from "@tsed/typeorm";
import {InsertResult, Repository} from "typeorm";
import {Injectable} from "@tsed/di";
import {AfterRoutesInit} from "@tsed/common";
import {WorkLogRecord} from "../entities";

@Injectable()
export class WorkLogRecordRepository implements AfterRoutesInit {
  private repository: Repository<WorkLogRecord>;

  constructor(private typeORMService: TypeORMService) {}

  $afterRoutesInit() {
    this.repository = this.typeORMService.get().manager.getRepository(WorkLogRecord);
  }

  public findAll(): Promise<WorkLogRecord[]> {
    return this.repository.find();
  }

  public create(record: WorkLogRecord): Promise<InsertResult> {
    return this.repository.insert(record);
  }
}
