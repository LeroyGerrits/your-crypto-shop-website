import { FieldDataType } from "../../enums/FieldDataType.enum";
import { FieldEntity } from "../../enums/FieldEntity.enum";
import { FieldType } from "../../enums/FieldType.enum";

export class GetFieldsParameters {
    Name?: string;
    ShopId?: string;
    Entity?: FieldEntity;
    Type?: FieldType;
    DataType?: FieldDataType;
    Visible?: boolean;
}