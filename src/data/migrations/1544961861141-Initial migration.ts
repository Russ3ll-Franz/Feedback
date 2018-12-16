import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1544961861141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `teams` (`teamID` int NOT NULL AUTO_INCREMENT, `projectName` varchar(40) NOT NULL, `startDate` date NOT NULL, `endDate` date NOT NULL, `teamMembers` int NOT NULL, PRIMARY KEY (`teamID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`userID` int NOT NULL AUTO_INCREMENT, `email` varchar(100) NOT NULL, `password` varchar(200) NOT NULL, `username` varchar(20) NOT NULL, `firstName` varchar(35) NOT NULL, `lastName` varchar(35) NULL, `receivedFeedbacks` int NULL, `givenFeedbacks` int NULL, `role` varchar(255) NOT NULL DEFAULT 'User', PRIMARY KEY (`userID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `feedbackLog` (`feedbackLogID` int NOT NULL AUTO_INCREMENT, `feedback` varchar(1000) NOT NULL, `receiverUserID` int NULL, `senderUserID` int NULL, PRIMARY KEY (`feedbackLogID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teams_user_users` (`teamsTeamID` int NOT NULL, `usersUserID` int NOT NULL, PRIMARY KEY (`teamsTeamID`, `usersUserID`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `feedbackLog` ADD CONSTRAINT `FK_59fa6fae4a99338fca7ccebb047` FOREIGN KEY (`receiverUserID`) REFERENCES `users`(`userID`)");
        await queryRunner.query("ALTER TABLE `feedbackLog` ADD CONSTRAINT `FK_62ed106e4b936a0e295543b155d` FOREIGN KEY (`senderUserID`) REFERENCES `users`(`userID`)");
        await queryRunner.query("ALTER TABLE `teams_user_users` ADD CONSTRAINT `FK_feec66fd015316ef4218c1890d5` FOREIGN KEY (`teamsTeamID`) REFERENCES `teams`(`teamID`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `teams_user_users` ADD CONSTRAINT `FK_0d953d3b5a7202b3d54d4920fff` FOREIGN KEY (`usersUserID`) REFERENCES `users`(`userID`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `teams_user_users` DROP FOREIGN KEY `FK_0d953d3b5a7202b3d54d4920fff`");
        await queryRunner.query("ALTER TABLE `teams_user_users` DROP FOREIGN KEY `FK_feec66fd015316ef4218c1890d5`");
        await queryRunner.query("ALTER TABLE `feedbackLog` DROP FOREIGN KEY `FK_62ed106e4b936a0e295543b155d`");
        await queryRunner.query("ALTER TABLE `feedbackLog` DROP FOREIGN KEY `FK_59fa6fae4a99338fca7ccebb047`");
        await queryRunner.query("DROP TABLE `teams_user_users`");
        await queryRunner.query("DROP TABLE `feedbackLog`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `teams`");
    }

}
