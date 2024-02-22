export type BinanceSymbol = {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    makerCommission: number;
    takerCommission: number;
    priceTickSize: number;
    lotStepSize: number;
};
