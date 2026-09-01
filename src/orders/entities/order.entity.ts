import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    amount: number;

    @Column('decimal')
    longitude: number;

    @Column('decimal')
    latitude: number;

    @Column()
    clientId: number;

    @Column({
        type: 'enum',
        enum: ['Cash', 'Visa'],
    })
    paymentMethod: 'Cash' | 'Visa';
}