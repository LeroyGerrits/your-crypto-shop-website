import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from '../../services/authentication.service';
import { Constants } from '../../constants';
import { CryptoWallet } from '../../models/crypto-wallet.model';
import { CryptoWalletService } from '../../services/crypto-wallet.service';
import { Currency } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyType } from '../../enums/currency-type.enum';
import { GetCurrenciesParameters } from '../../models/parameters/get-currencies-parameters.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Merchant } from '../../models/merchant.model';
import { MutationResult } from '../../models/mutation-result.model';

@Component({
    selector: 'dialog-create-crypto-wallet',
    templateUrl: 'dialog.create-crypto-wallet.component.html'
})
export class DialogCreateCryptoWalletComponent implements OnInit {
    public activeMerchant?: Merchant | null;

    constants = Constants;

    public controlName = new FormControl('', Validators.required);
    public controlCurrency = new FormControl('', Validators.required);
    public controlAddress = new FormControl('', Validators.required);

    public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;

    public form!: FormGroup;
    public formLoading = false;
    public formSubmitted = false;

    public currencies: Currency[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private dialogRefComponent: MatDialogRef<any>,
        private cryptoWalletService: CryptoWalletService,
        private currencyService: CurrencyService,
        private snackBar: MatSnackBar
    ) {
        this.form = new FormGroup([
            this.controlCurrency,
            this.controlName,
            this.controlAddress
        ]);
    }

    ngOnInit() {
        this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);

        const parameters = new GetCurrenciesParameters();
        parameters.Type = CurrencyType.Crypto;
        parameters.Supported = true;
        this.currencyService.getList(parameters).subscribe(currencies => this.currencies = currencies);
    }

    onSubmit() {
        this.formSubmitted = true;

        if (this.form.invalid) {
            return;
        }

        const cryptoWalletToCreate: CryptoWallet = {
            Id: '',
            MerchantId: this.activeMerchant!.Id!,
            CurrencyId: this.controlCurrency.value!,
            Name: this.controlName.value!,
            Address: this.controlAddress.value!
        };

        this.cryptoWalletService.create(cryptoWalletToCreate).subscribe({
            next: result => this.handleOnSubmitResult(result),
            error: error => this.handleOnSubmitError(error),
            complete: () => this.formLoading = false
        });
    }

    handleOnSubmitResult(result: MutationResult) {
        if (result.Success) {
            if (this.dialogRefComponent)
                this.dialogRefComponent.close();
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