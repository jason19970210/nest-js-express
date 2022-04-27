import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): any {
        next();
    }

    async onModuleInit() {
        console.log('middleware onModuleInit');
    }

    async onApplicationBootstrap() {
        console.log('middleware onApplicationBootstrap');
    }

    async onModuleDestroy() {
        console.log('middleware onModuleDestroy');
    }

    async beforeApplicationShutdown(signal) {
        console.log(`middleware beforeApplicationShutdown (${signal})`);
    }

    async onApplicationShutdown(signal) {
        console.log(`middleware onApplicationShutdown (${signal})`);
    }
}
