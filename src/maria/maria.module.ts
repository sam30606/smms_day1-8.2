import { Module } from '@nestjs/common';
import { MariaController } from './maria.controller';
import { MariaService } from './maria.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entitys/fruit.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Fruit]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MARIADB_HOST,
      port: 3306,
      username: process.env.MARIADB_USERNAME,
      password: process.env.MARIADB_PASSWORD,
      database: 'db',
      entities: [Fruit],
      synchronize: true,
    }),
  ],
  controllers: [MariaController],
  providers: [MariaService],
})
export class Maria {}
