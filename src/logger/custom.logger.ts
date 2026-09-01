import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {

    log(message: string) {
        console.log(`[LOG] ${message}`);
    }

    error(message: string) {
        console.error(`[ERROR] ${message}`);
    }

    warn(message: string) {
        console.warn(`[WARN] ${message}`);
    }
}