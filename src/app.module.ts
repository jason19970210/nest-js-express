import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoModule } from './todo/todo.module';

import MongoConfigFactory from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [MongoConfigFactory],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongo.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}