import { Field } from 'src/app/shared/models/Field.model';
import { FieldDataType } from 'src/app/shared/enums/FieldDataType.enum';
import { FieldEntity } from 'src/app/shared/enums/FieldEntity.enum';
import { FieldType } from 'src/app/shared/enums/FieldType.enum';
import { TestDataShops } from './Shops';

export const TestDataFields: Field[] = [
    {
        Id: '00000000-0000-0000-0000-000000000001',
        Shop: TestDataShops[0],
        Name: 'Text field',
        Entity: FieldEntity.Product,
        Type: FieldType.Static,
        DataType: FieldDataType.Text,
        UserDefinedMandatory: false,
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