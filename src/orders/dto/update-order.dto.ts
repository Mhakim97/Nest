import {
    IsNumber,
    IsInt,
    IsEnum,
    IsOptional,
} from 'class-validator';

enum PaymentMethod {
    CASH = 'Cash',
    VISA = 'Visa',
}

export class UpdateOrderDto {

    @IsOptional()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsInt()
    clientId?: number;

    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod?: PaymentMethod;
}