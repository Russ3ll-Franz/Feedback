import {MigrationInterface, QueryRunner} from "typeorm";

export class MIGRACIQTAAAAA1545049340219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `feedbackLog` (`feedbackLogID` int NOT NULL AUTO_INCREMENT, `feedback` varchar(1000) NOT NULL, `receiverUserID` int NULL, `senderUserID` int NULL, PRIMARY KEY (`feedbackLogID`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `roles` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `roles` ADD `role` varchar(10) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `lastName` `lastName` varchar(35) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `receivedFeedbacks` `receivedFeedbacks` int NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `givenFeedbacks` `givenFeedbacks` int NULL");
        await queryRunner.query("ALTER TABLE `feedbackLog` ADD CONSTRAINT `FK_59fa6fae4a99338fca7ccebb047` FOREIGN KEY (`receiverUserID`) REFERENCES `users`(`userID`)");
        await queryRunner.query("ALTER TABLE `feedbackLog` ADD CONSTRAINT `FK_62ed106e4b936a0e295543b155d` FOREIGN KEY (`senderUserID`) REFERENCES `users`(`userID`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `feedbackLog` DROP FOREIGN KEY `FK_62ed106e4b936a0e295543b155d`");
        await queryRunner.query("ALTER TABLE `feedbackLog` DROP FOREIGN KEY `FK_59fa6fae4a99338fca7ccebb047`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `givenFeedbacks` `givenFeedbacks` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `receivedFeedbacks` `receivedFeedbacks` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `lastName` `lastName` varchar(35) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `roles` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `roles` ADD `role` varchar(40) NOT NULL");
        await queryRunner.query("DROP TABLE `feedbackLog`");
    }

}
