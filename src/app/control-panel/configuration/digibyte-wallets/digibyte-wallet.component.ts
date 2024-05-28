import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from 'src/app/shared/services/-authentication.service';
import { DigiByteWallet } from 'src/app/shared/models/digibyte-wallet.model';
import { DigiByteWalletService } from 'src/app/shared/services/digibyte-wallet.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { Merchant } from 'src/app/shared/models/-merchant.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';

@Component({
  selector: 'control-panel-configuration-digibyte-wallet',
  templateUrl: './digibyte-wallet.component.html'
})

export class ControlPanelConfigurationDigiByteWalletComponent implements OnInit, OnDestroy {
  public activeMerchant?: Merchant | null;

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringDigiByteWalletId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlAddress = new FormControl('', Validators.required);

  public pageTitle = 'Assign new DigiByte wallet'
  public digibyteWallet: DigiByteWallet = new DigiByteWallet();

  constructor(
    private authenticationService: AuthenticationService,
    private digibyteWalletService: DigiByteWalletService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);

    this.form = new FormGroup([
      this.controlName,
      this.controlAddress
    ]);
  }

  ngOnInit() {
    this.queryStringDigiByteWalletId = this.route.snapshot.paramMap.get('digiByteWalletId');

    if (this.queryStringDigiByteWalletId && this.queryStringDigiByteWalletId != 'new') {
      this.digibyteWalletService.getById(this.queryStringDigiByteWalletId).subscribe(x => { this.onRetrieveData(x); });
    }
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveData(digibyteWallet: DigiByteWallet) {
    this.digibyteWallet = digibyteWallet;
    this.pageTitle = digibyteWallet.Name;
    this.controlName.setValue(digibyteWallet.Name);
    this.controlAddress.setValue(digibyteWallet.Address);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const digibyteWalletToUpdate: DigiByteWallet = Object.assign({}, this.digibyteWallet);

    if (this.activeMerchant)
      digibyteWalletToUpdate.MerchantId = this.activeMerchant!.Id!;

    digibyteWalletToUpdate.Name = this.controlName.value!;
    digibyteWalletToUpdate.Address = this.controlAddress.value!;

    if (this.queryStringDigiByteWalletId && this.queryStringDigiByteWalletId != 'new') {
      this.digibyteWalletService.update(digibyteWalletToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.digibyteWalletService.create(digibyteWalletToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/configuration/digibyte-wallets']);
    } else {
      if (result.Constraint == 'UNIQUE_DigiByteWallet_Name') {
        this.snackBarRef = this.snackBar.open('A digibyte wallet with this name already exists.', 'Close', { panelClass: ['error-snackbar'] });
      } else if (result.Constraint == 'UNIQUE_DigiByteWallet_Address') {
        this.snackBarRef = this.snackBar.open('A digibyte wallet with this address has already been assigned.', 'Close', { panelClass: ['error-snackbar'] });
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