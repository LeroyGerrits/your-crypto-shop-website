import { BooleanConvertPipe } from "./boolean-convert.pipe";

describe('BooleanConvertPipe', () => {
    const pipe = new BooleanConvertPipe();

    it('should return true when the boolean input evaluates to a true boolean', () => {
        expect(pipe.transform(true)).toBeTrue();
    });

    it('should return true when the textual input evaluates to a true boolean', () => {
        expect(pipe.transform('true')).toBeTrue();
    });

    it('should return false when the input evaluates to a false boolean', () => {
        expect(pipe.transform('0')).toBeFalse();
    });
});