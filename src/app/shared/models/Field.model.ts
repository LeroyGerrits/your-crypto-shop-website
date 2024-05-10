import { FieldDataType } from '../enums/FieldDataType.enum';
import { FieldEntity } from '../enums/FieldEntity.enum';
import { FieldType } from '../enums/FieldType.enum';
import { Shop } from './Shop.model';

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