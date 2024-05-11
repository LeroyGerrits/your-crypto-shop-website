import { FieldType } from "../enums/FieldType.enum";
import { FieldTypePipe } from "./fieldType.pipe";

describe('fieldTypePipe', () => {
    const pipe = new FieldTypePipe();

    it('should return \'Static\' when a static field type gets supplied', () => {
        expect(pipe.transform(FieldType.Static.toString())).toBe('Static');
    });

    it('should return \'Customer defined\' when a CustomerDefined field type gets supplied', () => {
        expect(pipe.transform(FieldType.CustomerDefined.toString())).toBe('Customer defined');
    });
});