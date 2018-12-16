import {MigrationInterface, QueryRunner} from "typeorm";

export class Change1544918752218 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `email` `email` varchar(100) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password` `password` varchar(200) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `username` `username` varchar(20) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `firstName` `firstName` varchar(35) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `lastName` `lastName` varchar(35) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `receivedFeedbacks` `receivedFeedbacks` int NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `givenFeedbacks` `givenFeedbacks` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `givenFeedbacks` `givenFeedbacks` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `receivedFeedbacks` `receivedFeedbacks` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `lastName` `lastName` varchar(35) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `firstName` `firstName` varchar(35) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `username` `username` varchar(20) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `password` `password` varchar(200) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `email` `email` varchar(100) NULL DEFAULT 'NULL'");
    }

}
