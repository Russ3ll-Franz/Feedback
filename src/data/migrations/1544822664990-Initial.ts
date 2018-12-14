import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1544822664990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `roles` (`roleID` int NOT NULL AUTO_INCREMENT, `roleName` varchar(45) NOT NULL, PRIMARY KEY (`roleID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usersRoles` (`userRoleID` int NOT NULL AUTO_INCREMENT, `userID` int NOT NULL, `roleID` int NOT NULL, PRIMARY KEY (`userRoleID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teams` (`teamID` int NOT NULL AUTO_INCREMENT, `projectName` varchar(150) NOT NULL, `startDate` date NOT NULL, `endDate` date NOT NULL, `teamMembers` int NOT NULL, PRIMARY KEY (`teamID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usersTeams` (`user_teamID` int NOT NULL AUTO_INCREMENT, `userID` int NOT NULL, `teamID` int NOT NULL, PRIMARY KEY (`user_teamID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`userID` int NOT NULL AUTO_INCREMENT, `username` varchar(45) NOT NULL, `firstName` varchar(45) NOT NULL, `lastName` varchar(45) NULL DEFAULT 'NULL', `password` varchar(150) NOT NULL, `email` varchar(50) NOT NULL, `receivedFeedbacks` int NULL, `givenFeedbacks` int NULL, PRIMARY KEY (`userID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `feedbackLog` (`feedbackLogID` int NOT NULL AUTO_INCREMENT, `feedback` varchar(1000) NOT NULL, `receiverID` int NOT NULL, `senderID` int NOT NULL, PRIMARY KEY (`feedbackLogID`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `usersRoles` ADD CONSTRAINT `FK_4c90d92a08cd40bd004d2e14c92` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE NO ACTION");
        await queryRunner.query("ALTER TABLE `usersRoles` ADD CONSTRAINT `FK_7d8862cd9691ceb4744844f3f5c` FOREIGN KEY (`roleID`) REFERENCES `roles`(`roleID`) ON DELETE NO ACTION");
        await queryRunner.query("ALTER TABLE `usersTeams` ADD CONSTRAINT `FK_a2dcce486ce5c372a9184b3b225` FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON DELETE NO ACTION");
        await queryRunner.query("ALTER TABLE `usersTeams` ADD CONSTRAINT `FK_cb52f915eff83158d4a1486bb28` FOREIGN KEY (`teamID`) REFERENCES `teams`(`teamID`) ON DELETE NO ACTION");
        await queryRunner.query("ALTER TABLE `feedbackLog` ADD CONSTRAINT `FK_1f00950a7db940a61896dbcfbb0` FOREIGN KEY (`receiverID`) REFERENCES `users`(`userID`) ON DELETE NO ACTION");
        await queryRunner.query("ALTER TABLE `feedbackLog` ADD CONSTRAINT `FK_0bad714e6ee61f91d02826e5921` FOREIGN KEY (`senderID`) REFERENCES `users`(`userID`) ON DELETE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `feedbackLog` DROP FOREIGN KEY `FK_0bad714e6ee61f91d02826e5921`");
        await queryRunner.query("ALTER TABLE `feedbackLog` DROP FOREIGN KEY `FK_1f00950a7db940a61896dbcfbb0`");
        await queryRunner.query("ALTER TABLE `usersTeams` DROP FOREIGN KEY `FK_cb52f915eff83158d4a1486bb28`");
        await queryRunner.query("ALTER TABLE `usersTeams` DROP FOREIGN KEY `FK_a2dcce486ce5c372a9184b3b225`");
        await queryRunner.query("ALTER TABLE `usersRoles` DROP FOREIGN KEY `FK_7d8862cd9691ceb4744844f3f5c`");
        await queryRunner.query("ALTER TABLE `usersRoles` DROP FOREIGN KEY `FK_4c90d92a08cd40bd004d2e14c92`");
        await queryRunner.query("DROP TABLE `feedbackLog`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `usersTeams`");
        await queryRunner.query("DROP TABLE `teams`");
        await queryRunner.query("DROP TABLE `usersRoles`");
        await queryRunner.query("DROP TABLE `roles`");
    }
}
