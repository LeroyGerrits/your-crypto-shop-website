import { FieldType } from "../enums/field-type.enum";
import { FieldTypePipe } from "./field-type.pipe";

describe('fieldTypePipe', () => {
    const pipe = new FieldTypePipe();

    it('should return \'Static\' when a static field type gets supplied', () => {
        expect(pipe.transform(FieldType.Static.toString())).toBe('Static');
    });

    it('should return \'Customer defined\' when a CustomerDefined field type gets supplied', () => {
        expect(pipe.transform(FieldType.CustomerDefined.toString())).toBe('Customer defined');
    });
});