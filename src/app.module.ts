import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { CategoriesModule } from "./categories/categories.module";
import { MaterialsModule } from "./materials/materials.module";
import { ExchangeRatesModule } from "./exchange-rates/exchange-rates.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`]
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.RATE_LIMITING_TTL) || 60000,
          limit: Number(process.env.RATE_LIMITING_LIMIT) || 10
        }
      ]
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      charset: process.env.DATABASE_CHARSET,
      entities: [
          __dirname + "/../**/entities/*.entity{.ts,.js}",
      ],
      autoLoadEntities: process.env.DATABASE_AUTO_LOAD_ENTITIES === "true",
      synchronize: process.env.DATABASE_SYNCHRONIZE === "true",
      dropSchema: process.env.DATABASE_SYNCHRONIZE === "true",
      poolSize: Number(process.env.DATABASE_POOL_MAX) || 10,
      logging: process.env.NODE_ENV === "development",
      namingStrategy: new SnakeNamingStrategy(),

      // these control how BIGINT and DECIMAL are parsed:
      supportBigNumbers: true,    // default: false
      bigNumberStrings: false,    // force numbers when within JS safe range
      extra: {
        decimalNumbers: true      // instruct mysql2 to parse DECIMAL → number
      }
    }),
    AuthModule,
    CategoriesModule,
    MaterialsModule,
    ExchangeRatesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
