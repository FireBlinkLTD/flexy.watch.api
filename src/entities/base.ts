import {PrimaryGeneratedColumn} from "typeorm";
import {Property} from "@tsed/common";

export class BaseEntity {

  @PrimaryGeneratedColumn()
  @Property()
  id: number;
}
