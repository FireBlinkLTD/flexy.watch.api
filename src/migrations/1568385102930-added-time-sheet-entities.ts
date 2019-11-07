import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddedTimeSheetRecord1568385102930 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table(
      {
        name: "work_log_record",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            type: "integer"
          }, {
            name: "project_id",
            type: "varchar(80)"
          }, {
            name: "text",
            type: "text"
          }, {
            name: "spent_time_seconds",
            type: "integer"
          }, {
            name: "date",
            type: "date"
          }, {
            name: "user_id",
            type: "varchar(50)"
          }
        ]
      }
    ));
    await queryRunner.createTable(new Table(
      {
        name: "day_status_record",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            type: "integer"
          }, {
            name: "type",
            type: "varchar(50)"
          }, {
            name: "comment",
            isNullable: true,
            type: "text"
          }, {
            name: "date",
            type: "date"
          }, {
            name: "user_id",
            type: "varchar(50)"
          }
        ]
      }
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("work_log_record");
    await queryRunner.dropTable("day_status_record");
  }

}
