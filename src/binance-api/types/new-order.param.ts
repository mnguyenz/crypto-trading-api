import { OrderType, Side, TimeInForce } from '@binance/connector-typescript';

export type NewOrderParam = {
    symbol: string;
    side: Side;
    type: OrderType;
    price: number;
    quantity?: number;
    timeInForce?: TimeInForce;
};
