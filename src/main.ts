import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module.js';
import { CustomLogger } from './logger/custom.logger.js';

async function bootstrap() {

    const app = await NestFactory.create(AppModule, {
        logger: new CustomLogger(),
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    await app.listen(3000);
}

bootstrap();