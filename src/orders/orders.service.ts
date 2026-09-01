import { Injectable } from '@nestjs/common';

import { Order } from './entities/order.entity.js';
import { OrderRepository } from './repositories/order.respository.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

@Injectable()
export class OrderService {

    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}

    private mapOrder(order: Order) {

        return {
            id: order.id,
            amount: Number(order.amount),
            longitude: Number(order.longitude),
            latitude: Number(order.latitude),
            clientId: order.clientId,
            paymentMethod: order.paymentMethod,
        };
    }

    async getAllOrders(
        clientId?: number,
        paymentMethod?: 'Cash' | 'Visa',
    ) {

        const orders =
            await this.orderRepository.getAllOrders(
                clientId,
                paymentMethod,
            );

        return orders.map(
            order => this.mapOrder(order),
        );
    }

    async getOrderById(id: string) {

        const order =
            await this.orderRepository.getOrderById(id);

        if (!order) {
            return null;
        }

        return this.mapOrder(order);
    }

    async createOrder(
        createOrderDto: CreateOrderDto,
    ) {

        const order = new Order();

        order.amount = createOrderDto.amount;
        order.longitude = createOrderDto.longitude;
        order.latitude = createOrderDto.latitude;
        order.clientId = createOrderDto.clientId;
        order.paymentMethod =
            createOrderDto.paymentMethod;

        const savedOrder =
            await this.orderRepository.createOrder(order);

        return this.mapOrder(savedOrder);
    }

    async updateOrder(
        id: string,
        updateOrderDto: UpdateOrderDto,
    ) {

        const order =
            await this.orderRepository.getOrderById(id);

        if (!order) {
            return null;
        }

        if (updateOrderDto.amount) {
            order.amount = updateOrderDto.amount;
        }

        if (updateOrderDto.longitude) {
            order.longitude = updateOrderDto.longitude;
        }

        if (updateOrderDto.latitude) {
            order.latitude = updateOrderDto.latitude;
        }

        if (updateOrderDto.clientId) {
            order.clientId = updateOrderDto.clientId;
        }

        if (updateOrderDto.paymentMethod) {
            order.paymentMethod =
                updateOrderDto.paymentMethod;
        }

        const updatedOrder =
            await this.orderRepository.updateOrder(order);

        return this.mapOrder(updatedOrder);
    }

    async deleteOrder(id: string) {

        const order =
            await this.orderRepository.getOrderById(id);

        if (!order) {
            return false;
        }

        await this.orderRepository.deleteOrder(order);

        return true;
    }
}