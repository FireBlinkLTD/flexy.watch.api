import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {MaxLength, Property, Required} from "@tsed/common";

@Entity("work_log_record")
export class WorkLogRecord {

  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({name: "project_id"})
  @Property()
  @Required()
  projectId: string;

  @Column()
  @MaxLength(200)
  @Property()
  @Required()
  text: string;

  @Column({name: "spent_time"})
  @Property()
  @Required()
  spentTime: number;

  @Column("date")
  @Property()
  @Required()
  date: Date;

  @Column({name: "user_id"})
  @Property()
  @Required()
  userId: string;
}
