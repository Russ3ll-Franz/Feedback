import { ConfigService } from './config/config.service';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CoreModule } from './common/core/core.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: ['./src/data/entities/*.entity.ts'],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
