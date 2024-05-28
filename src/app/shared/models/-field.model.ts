import { FieldDataType } from '../enums/field-data-type.enum';
import { FieldEntity } from '../enums/field-entity.enum';
import { FieldType } from '../enums/field-type.enum';
import { Shop } from './-shop.model';

export class Field {
    Id!: string;
    Shop!: Shop;
    Name!: string;
    Entity!: FieldEntity;
    Type!: FieldType;
    UserDefinedMandatory!: boolean;
    DataType!: FieldDataType;
    Enumerations?: string[];
    SortOrder?: number;
    Visible!: boolean;
}