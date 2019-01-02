import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedOneMiddleTableAndAddedAFieldInTheFeedbacks1546442421507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `feedbacklog` ADD `teamID` int NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `lastName` `lastName` varchar(35) NULL");
        await queryRunner.query("ALTER TABLE `feedbacklog` DROP FOREIGN KEY `FK_5757850c1a2b96a41073f3bfe14`");
        await queryRunner.query("ALTER TABLE `feedbacklog` DROP FOREIGN KEY `FK_0a07724401efe9c97e9954dcb4a`");
        await queryRunner.query("ALTER TABLE `feedbacklog` CHANGE `receiverUserID` `receiverUserID` int NULL");
        await queryRunner.query("ALTER TABLE `feedbacklog` CHANGE `senderUserID` `senderUserID` int NULL");
        await queryRunner.query("ALTER TABLE `feedbacklog` ADD CONSTRAINT `FK_5757850c1a2b96a41073f3bfe14` FOREIGN KEY (`receiverUserID`) REFERENCES `users`(`userID`)");
        await queryRunner.query("ALTER TABLE `feedbacklog` ADD CONSTRAINT `FK_0a07724401efe9c97e9954dcb4a` FOREIGN KEY (`senderUserID`) REFERENCES `users`(`userID`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `feedbacklog` DROP FOREIGN KEY `FK_0a07724401efe9c97e9954dcb4a`");
        await queryRunner.query("ALTER TABLE `feedbacklog` DROP FOREIGN KEY `FK_5757850c1a2b96a41073f3bfe14`");
        await queryRunner.query("ALTER TABLE `feedbacklog` CHANGE `senderUserID` `senderUserID` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `feedbacklog` CHANGE `receiverUserID` `receiverUserID` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `feedbacklog` ADD CONSTRAINT `FK_0a07724401efe9c97e9954dcb4a` FOREIGN KEY (`senderUserID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `feedbacklog` ADD CONSTRAINT `FK_5757850c1a2b96a41073f3bfe14` FOREIGN KEY (`receiverUserID`) REFERENCES `users`(`userID`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `users` CHANGE `lastName` `lastName` varchar(35) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `feedbacklog` DROP COLUMN `teamID`");
    }

}
