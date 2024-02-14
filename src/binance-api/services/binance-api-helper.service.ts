import { Injectable } from '@nestjs/common';
import { env } from '~config/env.config';
import crypto from 'crypto';

@Injectable()
export class BinanceApiHelperService {
    constructor() {}

    buildSign(data): string {
        return crypto.createHmac('sha256', env.BINANCE.API_SECRET).update(data).digest('hex');
    }
}
