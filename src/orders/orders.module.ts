import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity.js';
import { OrderController } from './orders.controller.js';
import { OrderService } from './orders.service.js';
import { OrderRepository } from './repositories/order.respository.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
    ],

    controllers: [
        OrderController,
    ],

    providers: [
        OrderService,
        OrderRepository,
    ],
})
export class OrderModule {}