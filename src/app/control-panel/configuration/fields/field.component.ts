import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { CountryService } from 'src/app/shared/services/Country.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { Field } from 'src/app/shared/models/Field.model';
import { FieldService } from 'src/app/shared/services/Field.service';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-field',
  templateUrl: './field.component.html'
})

export class ControlPanelConfigurationFieldComponent implements OnInit, OnDestroy {
  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringFieldId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);

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
      this.controlShop
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