import {MigrationInterface, QueryRunner} from "typeorm";

export class Post11624551748350 implements MigrationInterface {
    name = 'Post11624551748350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "FK_fac43dcd96c6ef662045d5c6b58"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "postId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME CONSTRAINT "PK_9b3ab408235ba7d60345a84f994" TO "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP COLUMN "postPostId"`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "PK_6476d7e464bcb8571004134515c"`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "PK_9df9e319a273ad45ce509cf2f68" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD "postId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "PK_9df9e319a273ad45ce509cf2f68"`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "PK_6476d7e464bcb8571004134515c" PRIMARY KEY ("userId", "postId")`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "FK_fd6b77bfdf9eae6691170bc9cb5"`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "PK_6476d7e464bcb8571004134515c"`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "PK_9df9e319a273ad45ce509cf2f68" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD "postId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "updoot" DROP CONSTRAINT "PK_9df9e319a273ad45ce509cf2f68"`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "PK_6476d7e464bcb8571004134515c" PRIMARY KEY ("userId", "postId")`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD "postPostId" uuid`);
        await queryRunner.query(`ALTER TABLE "post" RENAME CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" TO "PK_9b3ab408235ba7d60345a84f994"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "id" TO "postId"`);
        await queryRunner.query(`ALTER TABLE "updoot" ADD CONSTRAINT "FK_fac43dcd96c6ef662045d5c6b58" FOREIGN KEY ("postPostId") REFERENCES "post"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
