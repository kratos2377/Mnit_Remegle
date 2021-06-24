import {MigrationInterface, QueryRunner} from "typeorm";

export class Post1624534594947 implements MigrationInterface {
    name = 'Post1624534594947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "imageUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "imageUrl"`);
    }

}
