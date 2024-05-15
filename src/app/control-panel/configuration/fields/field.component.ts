import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { Constants } from 'src/app/shared/Constants';
import { Environment } from 'src/app/shared/environments/Environment';
import { Field } from 'src/app/shared/models/Field.model';
import { FieldDataType } from 'src/app/shared/enums/FieldDataType.enum';
import { FieldEntity } from 'src/app/shared/enums/FieldEntity.enum';
import { FieldService } from 'src/app/shared/services/Field.service';
import { FieldType } from 'src/app/shared/enums/FieldType.enum';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-field',
  templateUrl: './field.component.html'
})

export class ControlPanelConfigurationFieldComponent implements OnInit, OnDestroy {
  fieldDataTypes = Object.keys(FieldDataType).filter(p => isNaN(p as any));
  fieldEntities = Object.keys(FieldEntity).filter(p => isNaN(p as any));
  fieldTypes = Object.keys(FieldType).filter(p => isNaN(p as any));

  fieldDataTypeType: typeof FieldDataType = FieldDataType;
  fieldEntityType: typeof FieldEntity = FieldEntity;
  fieldTypeType: typeof FieldType = FieldType;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  enumerations: string[] = [];

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringFieldId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);
  public controlEntity = new FormControl('0', Validators.required);
  public controlType = new FormControl('0', Validators.required);
  public controlUserDefinedMandatory = new FormControl(false, Validators.required);
  public controlDataType = new FormControl('0', Validators.required);
  public controlEnumerations = new FormControl('');
  public controlSortOrder = new FormControl('', Validators.pattern(Constants.REGEX_PATTERN_NUMBER));
  public controlVisible = new FormControl(true, Validators.required);

  public field: Field = new Field();
  public shops: Shop[] | undefined;
  public pageTitle = 'Create new field'

  constructor(
    private fieldService: FieldService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlName,
      this.controlShop,
      this.controlEntity,
      this.controlType,
      this.controlUserDefinedMandatory,
      this.controlDataType,
      this.controlEnumerations,
      this.controlSortOrder,
      this.controlVisible
    ]);
  }

  ngOnInit() {
    this.queryStringFieldId = this.route.snapshot.paramMap.get('fieldId');

    if (this.queryStringFieldId && this.queryStringFieldId != 'new') {
      this.fieldService.getById(this.queryStringFieldId).subscribe(field => { this.onRetrieveFieldData(field); });
    }

    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveFieldData(field: Field) {
    this.field = field;
    this.pageTitle = field.Name;
    this.controlName.setValue(field.Name);
    this.controlShop.setValue(field.Shop.Id);
    this.controlEntity.setValue(this.fieldEntityType[field.Entity].toString());
    this.controlType.setValue(this.fieldTypeType[field.Type].toString());
    this.controlUserDefinedMandatory.setValue(field.UserDefinedMandatory);
    this.controlDataType.setValue(this.fieldDataTypeType[field.DataType].toString());

    if (field.Enumerations)
      this.enumerations = field.Enumerations;

    this.controlVisible.setValue(field.Visible);
  }

  addEnumeration(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.enumerations.push(value);
    }

    event.chipInput!.clear();
  }

  removeEnumeration(enumeration: string): void {
    const index = this.enumerations.indexOf(enumeration);

    if (index >= 0) {
      this.enumerations.splice(index, 1);
    }
  }

  editEnumeration(enumeration: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeEnumeration(enumeration);
      return;
    }

    const index = this.enumerations.indexOf(enumeration);
    if (index >= 0) {
      this.enumerations[index] = value;
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const fieldToUpdate: Field = Object.assign({}, this.field);
    fieldToUpdate.Name = this.controlName.value!;

    var selectedShop = this.shops?.find(x => x.Id == this.controlShop.value);
    if (selectedShop)
      fieldToUpdate.Shop = selectedShop;

    fieldToUpdate.Entity = parseInt(this.controlEntity.value!);
    fieldToUpdate.Type = parseInt(this.controlType.value!);
    fieldToUpdate.UserDefinedMandatory = this.controlUserDefinedMandatory.value!;
    fieldToUpdate.DataType = parseInt(this.controlDataType.value!);
    fieldToUpdate.Enumerations = this.enumerations;
    fieldToUpdate.Visible = this.controlVisible.value!;

    if (this.queryStringFieldId && this.queryStringFieldId != 'new') {
      this.fieldService.update(fieldToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.fieldService.create(fieldToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/configuration/fields']);
    } else {
      if (result.Constraint == 'UNIQUE_Field_Name') {
        this.snackBarRef = this.snackBar.open('A field with this name already exists for this shop.', 'Close', { panelClass: ['error-snackbar'] });
      } else {
        this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
      }
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}