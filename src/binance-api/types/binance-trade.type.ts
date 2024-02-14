export type BinanceTrade = {
    symbol: string;
    price: number;
    qty: number;
    quoteQty: number;
    commission: number;
    commissionAsset: string;
    isBuyer: boolean;
};
