import {
    IsNumber,
    IsInt,
    IsEnum,
} from 'class-validator';

enum PaymentMethod {
    CASH = 'Cash',
    VISA = 'Visa',
}

export class CreateOrderDto {

    @IsNumber()
    amount: number;

    @IsNumber()
    longitude: number;

    @IsNumber()
    latitude: number;

    @IsInt()
    clientId: number;

    @IsEnum(PaymentMethod)
    paymentMethod: PaymentMethod;
}