import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    HttpCode,
    HttpStatus,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';

import { OrderService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

@Controller('orders')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
    ) {}

    @Get()
    async getAllOrders(
        @Query('clientId') clientId?: string,
        @Query('paymentMethod') paymentMethod?: 'Cash' | 'Visa',
    ) {

        try {

            if (clientId && isNaN(Number(clientId))) {
                throw new BadRequestException(
                    'clientId must be a number',
                );
            }

            return await this.orderService.getAllOrders(
                clientId ? Number(clientId) : undefined,
                paymentMethod,
            );

        } catch (error) {

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Failed to get orders',
            );
        }
    }

    @Get(':id')
    async getOrderById(
        @Param('id') id: string,
    ) {

        try {

            const order =
                await this.orderService.getOrderById(id);

            if (!order) {
                throw new NotFoundException(
                    `Order with id ${id} not found`,
                );
            }

            return order;

        } catch (error) {

            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(
                'Failed to get order',
            );
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
    ) {

        try {

            return await this.orderService.createOrder(
                createOrderDto,
            );

        } catch (error) {

            throw new BadRequestException(
                'Failed to create order',
            );
        }
    }

    @Put(':id')
    async updateOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ) {

        try {

            const order =
                await this.orderService.updateOrder(
                    id,
                    updateOrderDto,
                );

            if (!order) {
                throw new NotFoundException(
                    `Order with id ${id} not found`,
                );
            }

            return order;

        } catch (error) {

            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new BadRequestException(
                'Failed to update order',
            );
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOrder(
        @Param('id') id: string,
    ) {

        try {

            const deleted =
                await this.orderService.deleteOrder(id);

            if (!deleted) {
                throw new NotFoundException(
                    `Order with id ${id} not found`,
                );
            }

        } catch (error) {

            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new BadRequestException(
                'Failed to delete order',
            );
        }
    }
}