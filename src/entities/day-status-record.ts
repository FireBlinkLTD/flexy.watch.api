import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Enum, MaxLength, Property, Required} from "@tsed/common";
import {DayStatusRecordType} from "../enums";

@Entity("day_status_record")
export class DayStatusRecord {

  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(200)
  @Property()
  comment: string;

  @Column()
  @Enum(DayStatusRecordType)
  @Property()
  @Required()
  type: DayStatusRecordType;

  @Column("date")
  @Property()
  @Required()
  date: Date;

  @Column({name: "user_id"})
  @Property()
  @Required()
  userId: string;
}
