import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Order } from '../entities/order.entity.js';

@Injectable()
export class OrderRepository extends Repository<Order> {

    constructor(dataSource: DataSource) {
        super(Order, dataSource.manager);
    }

    async getAllOrders(
        clientId?: number,
        paymentMethod?: 'Cash' | 'Visa',
    ): Promise<Order[]> {

        const query = this.createQueryBuilder('order');

        if (clientId) {
            query.andWhere(
                'order.clientId = :clientId',
                { clientId },
            );
        }

        if (paymentMethod) {
            query.andWhere(
                'order.paymentMethod = :paymentMethod',
                { paymentMethod },
            );
        }

        return await query.getMany();
    }

    async getOrderById(
        id: string,
    ): Promise<Order | null> {

        return await this.findOneBy({ id });
    }

    async createOrder(
        order: Order,
    ): Promise<Order> {

        return await this.save(order);
    }

    async updateOrder(
        order: Order,
    ): Promise<Order> {

        return await this.save(order);
    }

    async deleteOrder(
        order: Order,
    ): Promise<void> {

        await this.remove(order);
    }
}