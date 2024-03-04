import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUserTable1709510379674 implements MigrationInterface {
  name = 'InitUserTable1709510379674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
       "email" character varying NOT NULL, 
       "first_name" character varying NOT NULL, 
       "last_name" character varying NOT NULL, 
       "password" character varying NOT NULL, 
       "role" character varying NOT NULL DEFAULT 'user', 
       CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
       CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
