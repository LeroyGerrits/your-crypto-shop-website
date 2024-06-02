import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from 'src/app/shared/services/-authentication.service';
import { CryptoWallet } from 'src/app/shared/models/crypto-wallet.model';
import { CryptoWalletService } from 'src/app/shared/services/crypto-wallet.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { Merchant } from 'src/app/shared/models/-merchant.model';
import { MutationResult } from 'src/app/shared/models/mutation-result.model';

@Component({
  selector: 'control-panel-configuration-crypto-wallet',
  templateUrl: './crypto-wallet.component.html'
})

export class ControlPanelConfigurationCryptoWalletComponent implements OnInit, OnDestroy {
  public activeMerchant?: Merchant | null;

  public environment = Environment;
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringCryptoWalletId: string | null = '';

  public form!: FormGroup;
  public formLoading = false;
  public formSubmitted = false;
  public controlName = new FormControl('', Validators.required);
  public controlAddress = new FormControl('', Validators.required);

  public pageTitle = 'Assign new crypto wallet'
  public cryptoWallet: CryptoWallet = new CryptoWallet();

  constructor(
    private authenticationService: AuthenticationService,
    private cryptoWalletService: CryptoWalletService,
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
    this.queryStringCryptoWalletId = this.route.snapshot.paramMap.get('cryptoWalletId');

    if (this.queryStringCryptoWalletId && this.queryStringCryptoWalletId != 'new') {
      this.cryptoWalletService.getById(this.queryStringCryptoWalletId).subscribe(x => { this.onRetrieveData(x); });
    }
  }

  ngOnDestroy() {
    this.snackBarRef?.dismiss();
  }

  onRetrieveData(cryptoWallet: CryptoWallet) {
    this.cryptoWallet = cryptoWallet;
    this.pageTitle = cryptoWallet.Name;
    this.controlName.setValue(cryptoWallet.Name);
    this.controlAddress.setValue(cryptoWallet.Address);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.formLoading = true;

    const cryptoWalletToUpdate: CryptoWallet = Object.assign({}, this.cryptoWallet);

    if (this.activeMerchant)
      cryptoWalletToUpdate.MerchantId = this.activeMerchant!.Id!;

    cryptoWalletToUpdate.Name = this.controlName.value!;
    cryptoWalletToUpdate.Address = this.controlAddress.value!;

    if (this.queryStringCryptoWalletId && this.queryStringCryptoWalletId != 'new') {
      this.cryptoWalletService.update(cryptoWalletToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    } else {
      this.cryptoWalletService.create(cryptoWalletToUpdate).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/configuration/crypto-wallets']);
    } else {
      if (result.Constraint == 'UNIQUE_CryptoWallet_Name') {
        this.snackBarRef = this.snackBar.open('A crypto wallet with this name already exists.', 'Close', { panelClass: ['error-snackbar'] });
      } else if (result.Constraint == 'UNIQUE_CryptoWallet_Address') {
        this.snackBarRef = this.snackBar.open('A crypto wallet with this address has already been assigned.', 'Close', { panelClass: ['error-snackbar'] });
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