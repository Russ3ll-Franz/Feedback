import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1546611905757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `teams` (`teamID` int NOT NULL AUTO_INCREMENT, `projectName` varchar(40) NOT NULL, `startDate` date NOT NULL, `endDate` date NOT NULL, `teamMembers` int NOT NULL, PRIMARY KEY (`teamID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`userID` int NOT NULL AUTO_INCREMENT, `email` varchar(100) NOT NULL, `password` varchar(200) NOT NULL, `username` varchar(20) NOT NULL, `firstName` varchar(35) NOT NULL, `lastName` varchar(35) NULL, `receivedFeedbacks` int NOT NULL DEFAULT 0, `givenFeedbacks` int NOT NULL DEFAULT 0, `role` varchar(20) NOT NULL DEFAULT 'User', UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`userID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `feedbacklog` (`feedbacklogID` int NOT NULL AUTO_INCREMENT, `feedback` varchar(1000) NOT NULL, `teamID` int NOT NULL, `recieverUserID` int NULL, `senderUserID` int NULL, PRIMARY KEY (`feedbacklogID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teams_user_users` (`teamsTeamID` int NOT NULL, `usersUserID` int NOT NULL, PRIMARY KEY (`teamsTeamID`, `usersUserID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `teams_team_lead_users` (`teamsTeamID` int NOT NULL, `usersUserID` int NOT NULL, PRIMARY KEY (`teamsTeamID`, `usersUserID`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `feedbacklog` ADD CONSTRAINT `FK_43eedfdc27ad043ecad2ebe6bd7` FOREIGN KEY (`recieverUserID`) REFERENCES `users`(`userID`)");
        await queryRunner.query("ALTER TABLE `feedbacklog` ADD CONSTRAINT `FK_0a07724401efe9c97e9954dcb4a` FOREIGN KEY (`senderUserID`) REFERENCES `users`(`userID`)");
        await queryRunner.query("ALTER TABLE `teams_user_users` ADD CONSTRAINT `FK_feec66fd015316ef4218c1890d5` FOREIGN KEY (`teamsTeamID`) REFERENCES `teams`(`teamID`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `teams_user_users` ADD CONSTRAINT `FK_0d953d3b5a7202b3d54d4920fff` FOREIGN KEY (`usersUserID`) REFERENCES `users`(`userID`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `teams_team_lead_users` ADD CONSTRAINT `FK_6ba3fce186ed069d645ab49f01f` FOREIGN KEY (`teamsTeamID`) REFERENCES `teams`(`teamID`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `teams_team_lead_users` ADD CONSTRAINT `FK_63a764e6509271c1ae244ce5153` FOREIGN KEY (`usersUserID`) REFERENCES `users`(`userID`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `teams_team_lead_users` DROP FOREIGN KEY `FK_63a764e6509271c1ae244ce5153`");
        await queryRunner.query("ALTER TABLE `teams_team_lead_users` DROP FOREIGN KEY `FK_6ba3fce186ed069d645ab49f01f`");
        await queryRunner.query("ALTER TABLE `teams_user_users` DROP FOREIGN KEY `FK_0d953d3b5a7202b3d54d4920fff`");
        await queryRunner.query("ALTER TABLE `teams_user_users` DROP FOREIGN KEY `FK_feec66fd015316ef4218c1890d5`");
        await queryRunner.query("ALTER TABLE `feedbacklog` DROP FOREIGN KEY `FK_0a07724401efe9c97e9954dcb4a`");
        await queryRunner.query("ALTER TABLE `feedbacklog` DROP FOREIGN KEY `FK_43eedfdc27ad043ecad2ebe6bd7`");
        await queryRunner.query("DROP TABLE `teams_team_lead_users`");
        await queryRunner.query("DROP TABLE `teams_user_users`");
        await queryRunner.query("DROP TABLE `feedbacklog`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `teams`");
    }

}
