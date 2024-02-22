import { OrderType, Side } from '@binance/connector-typescript';

export type NewOrderParam = {
    symbol: string;
    side: Side;
    type: OrderType;
    price: number;
    quantity: number;
};
