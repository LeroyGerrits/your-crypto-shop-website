import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'HashRate' })
export class HashRatePipe implements PipeTransform {

    constructor() { }

    transform(hashRate: bigint): string {
        if (hashRate > 1000000000000000000n)
            return (Number(hashRate) * 100 / Number(1000000000000000000n) / 100).toFixed(2) + ' EH/s';

        if (hashRate > 1000000000000000n)
            return (Number(hashRate) * 100 / Number(1000000000000000n) / 100).toFixed(2) + ' PH/s';

        if (hashRate > 1000000000000n)
            return (Number(hashRate) * 100 / Number(1000000000000n) / 100).toFixed(2) + ' TH/s';

        if (hashRate > 1000000000n)
            return (Number(hashRate) * 100 / Number(1000000000n) / 100).toFixed(2) + ' GH/s';

        if (hashRate > 1000000n)
            return (Number(hashRate) * 100 / Number(1000000n) / 100).toFixed(2) + ' MH/s';

        if (hashRate > 1000n)
            return (Number(hashRate) * 100 / Number(1000n) / 100).toFixed(2) + ' KH/s';

        return hashRate.toString();
    }
}