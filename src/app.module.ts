import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from './orders/orders.module.js';

@Module({
    imports: [

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'mjb97',
            database: 'techxpress_db',

            autoLoadEntities: true,
            synchronize: true,
        }),

        OrderModule,
    ],
})
export class AppModule {}