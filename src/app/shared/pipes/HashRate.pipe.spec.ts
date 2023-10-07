import { HashRatePipe } from "./HashRate.pipe";

describe('HashRatePipe', () => {
    const pipe = new HashRatePipe();

    it('should return the number as text if it is lower than 1000', () => {
        expect(pipe.transform(500n)).toBe('500');
    });

    it('should divide the number by 1.000 and display in KH/s if it is higher than 1.000', () => {
        expect(pipe.transform(1500n)).toBe('1.50 KH/s');
    });

    it('should divide the number by 1.000.000 and display in KH/s if it is higher than 1.000.000', () => {
        expect(pipe.transform(1500000n)).toBe('1.50 MH/s');
    });

    it('should divide the number by 1.000.000.000 and display in KH/s if it is higher than 1.000.000.000', () => {
        expect(pipe.transform(1500000000n)).toBe('1.50 GH/s');
    });

    it('should divide the number by 1.000.000.000.000 and display in KH/s if it is higher than 1.000.000.000.000', () => {
        expect(pipe.transform(1500000000000n)).toBe('1.50 TH/s');
    });

    it('should divide the number by 1.000.000.000.000.000 and display in KH/s if it is higher than 1.000.000.000.000.000', () => {
        expect(pipe.transform(1500000000000000n)).toBe('1.50 PH/s');
    });

    it('should divide the number by 1.000.000.000.000.000.000 and display in KH/s if it is higher than 1.000.000.000.000.000.000', () => {
        expect(pipe.transform(1500000000000000000n)).toBe('1.50 EH/s');
    });
});