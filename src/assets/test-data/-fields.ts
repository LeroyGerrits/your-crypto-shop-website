import { Field } from 'src/app/shared/models/field.model';
import { FieldDataType } from 'src/app/shared/enums/field-data-type.enum';
import { FieldEntity } from 'src/app/shared/enums/field-entity.enum';
import { FieldType } from 'src/app/shared/enums/field-type.enum';
import { TestDataShops } from './-shops';

export const TestDataFields: Field[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: TestDataShops[0],
        Name: 'Text field',
        Entity: FieldEntity.Product,
        Type: FieldType.Static,
        DataType: FieldDataType.Text,
        UserDefinedMandatory: false,
        Enumerations: ['one', 'two', 'three'],
        Visible: true
    },
    {
        Id: '00000000-0000-0000-0000-000000000002',
        Shop: TestDataShops[0],
        Name: 'Date field',
        Entity: FieldEntity.Product,
        Type: FieldType.Static,
        DataType: FieldDataType.Date,
        UserDefinedMandatory: false,
        Visible: true
    }
];