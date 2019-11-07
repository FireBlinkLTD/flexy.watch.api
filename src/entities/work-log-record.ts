import {Column, Entity} from "typeorm";
import {Property, Required} from "@tsed/common";
import {BaseEntity} from "./base";

@Entity("work_log_record")
export class WorkLogRecord extends BaseEntity {

  @Column({name: "project_id"})
  @Property()
  @Required()
  projectId: string;

  @Column()
  @Property()
  @Required()
  text: string;

  @Column({name: "spent_time_seconds"})
  @Property()
  @Required()
  spentTimeSeconds: number;

  @Column("date")
  @Property()
  @Required()
  date: Date;

  @Column({name: "user_id"})
  @Property()
  @Required()
  userId: string;
}
