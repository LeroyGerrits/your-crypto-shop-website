import { FieldDataType } from "../../enums/field-data-type.enum";
import { FieldEntity } from "../../enums/field-entity.enum";
import { FieldType } from "../../enums/field-type.enum";

export class GetFieldsParameters {
    Name?: string;
    ShopId?: string;
    Entity?: FieldEntity;
    Type?: FieldType;
    DataType?: FieldDataType;
    Visible?: boolean;
}