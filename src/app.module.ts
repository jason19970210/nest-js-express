import { BeforeApplicationShutdown, OnApplicationBootstrap, MiddlewareConsumer, Module, NestModule, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppMiddleware } from './app.middleware';

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
})
export class AppModule implements
  NestModule,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*')
  };

  onModuleInit() {
    console.log('module onModuleDestroy');
  }

  onApplicationBootstrap() {
    console.log('module onApplicationBootstrap');
  }

  onModuleDestroy(): any {
    console.log('module onModuleDestroy');
  };

  beforeApplicationShutdown(signal?: string): any {
    console.log('module beforeApplicationShutdown');
  };

  onApplicationShutdown(signal?: string): any {
    console.log('module onApplicationShutdown');
  };
}
