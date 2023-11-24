import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';
import { Component } from '@angular/core';
import { Constants } from 'src/app/shared/Constants';
import { ControlPanelCatalogProductPhotoComponent } from './product-photo.component';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/Environment';
import { FileSizePipe } from 'src/app/shared/pipes/FileSize.pipe';
import { FileUploadProgress } from 'src/app/shared/models/system/FileUploadProgress.model';
import { GetProductPhotosParameters } from 'src/app/shared/models/parameters/GetProductPhotosParameters.model';
import { MatDialog } from '@angular/material/dialog';
import { Merchant } from 'src/app/shared/models/Merchant.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Product } from 'src/app/shared/models/Product.model';
import { ProductPhoto } from 'src/app/shared/models/ProductPhoto.model';
import { ProductPhotoService } from 'src/app/shared/services/ProductPhoto.service';
import { ProductService } from 'src/app/shared/services/Product.service';

@Component({
  selector: 'control-panel-catalog-product-photo-list',
  templateUrl: './product-photo-list.component.html',
  styleUrl: './product-photo-list.component.scss'
})

export class ControlPanelCatalogProductPhotoListComponent {
  public activeMerchant?: Merchant | null;

  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringProductId: string | null = '';
  public queryStringShopId: string | null = '';

  environment = Environment;
  constants = Constants;

  public product: Product | undefined;
  public productPhotos: ProductPhoto[] = [];

  public fileUploadCounter = 0;
  public fileUploadProgressItems: FileUploadProgress[] = [];
  public fileUploadAllowedExtensionsAccept: string = '';
  public fileUploadAllowedExtensionsText: string = '';
  public formLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private fileSizePipe: FileSizePipe,
    private productService: ProductService,
    private productPhotoService: ProductPhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.authenticationService.merchant.subscribe(x => this.activeMerchant = x?.Merchant);

    this.queryStringProductId = this.route.snapshot.paramMap.get('productId');
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    if (this.queryStringProductId)
      this.productService.getById(this.queryStringProductId).subscribe(product => this.product = product.Product);

    Constants.UPLOAD_ALLOWED_EXTENSIONS.forEach(extension => {
      this.fileUploadAllowedExtensionsAccept += (this.fileUploadAllowedExtensionsAccept != '' ? ',' : '') + `.${extension}`
      this.fileUploadAllowedExtensionsText += (this.fileUploadAllowedExtensionsText != '' ? ',' : '') + ` ${extension.toUpperCase()}`
    });

    this.retrieveProductPhotos();
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
  }

  retrieveProductPhotos() {
    const parameters: GetProductPhotosParameters = {
      ProductId: this.queryStringProductId!
    };

    this.productPhotoService.getList(parameters).subscribe(productPhotos => this.productPhotos = productPhotos);
  }

  editDescription(productPhoto: ProductPhoto) {
    const dialogProductPhoto = this.dialog.open(ControlPanelCatalogProductPhotoComponent, {
      data: { productPhotoToEdit: productPhoto }
    });

    dialogProductPhoto.afterClosed().subscribe(() => this.retrieveProductPhotos());
  }

  setMain(productPhoto: ProductPhoto) {
    if (!this.formLoading) {
      this.formLoading = true;

      this.productPhotoService.changeMain(productPhoto.Id).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  setVisible(productPhoto: ProductPhoto, visible: boolean) {
    if (!this.formLoading) {
      this.formLoading = true;

      this.productPhotoService.changeVisible(productPhoto.Id, visible).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  moveUp(productPhoto: ProductPhoto) {
    if (!this.formLoading) {
      this.formLoading = true;

      this.productPhotoService.moveUp(productPhoto.Id).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  moveDown(productPhoto: ProductPhoto) {
    if (!this.formLoading) {
      this.formLoading = true;

      this.productPhotoService.moveDown(productPhoto.Id).subscribe({
        next: result => this.handleOnSubmitResult(result),
        error: error => this.handleOnSubmitError(error),
        complete: () => this.formLoading = false
      });
    }
  }

  delete(productPhoto: ProductPhoto) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete photo '${productPhoto.File}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.productPhotoService.delete(productPhoto.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  uploadFile(files: FileList) {
    if (files.length === 0) {
      return;
    }

    for (let index = 0; index < files.length; index++) {
      const fileToUpload = files[index];
      const fileNameSplit = fileToUpload.name.split('.');
      const fileExtention = fileNameSplit[fileNameSplit.length - 1];

      let fileUploadIndex = this.fileUploadCounter++;
      let fileUploadProgressItem: FileUploadProgress = {
        Number: fileUploadIndex + 1,
        Progress: 0,
        FileName: fileToUpload.name,
        Finished: false,
        Visible: true
      }

      this.fileUploadProgressItems.push(fileUploadProgressItem);

      if (!Constants.UPLOAD_ALLOWED_EXTENSIONS.includes(fileExtention.toLowerCase())) {
        this.fileUploadProgressItems[fileUploadIndex].Message = `File type ${fileExtention} is not allowed. Only the following file types are allowed: ${Constants.UPLOAD_ALLOWED_EXTENSIONS}`;
        this.fileUploadProgressItems[fileUploadIndex].Finished = true;
        this.checkFileUploadsFinished();
        continue;
      }

      if (fileToUpload.size > Constants.UPLOAD_MAXIMUM_FILE_SIZE) {
        console.log('SIZE!!!!');
        console.log(fileToUpload.size);
        this.fileUploadProgressItems[fileUploadIndex].Message = 'File was too large. The maximum allowed file size is ' + this.fileSizePipe.transform(Constants.UPLOAD_MAXIMUM_FILE_SIZE) + '.';
        this.fileUploadProgressItems[fileUploadIndex].Finished = true;
        this.checkFileUploadsFinished();
        continue;
      }

      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.productPhotoService.upload(this.queryStringProductId!, formData)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress)
              this.fileUploadProgressItems[fileUploadIndex].Progress = Math.round(100 * event.loaded / event.total!);
            else if (event.type === HttpEventType.Response) {
              this.fileUploadProgressItems[fileUploadIndex].Message = 'Successfully uploaded';
            }
          },
          error: (error) => {
            this.fileUploadProgressItems[fileUploadIndex].Message = error.message;
            this.fileUploadProgressItems[fileUploadIndex].Finished = true;
            this.checkFileUploadsFinished();
          },
          complete: () => {
            this.fileUploadProgressItems[fileUploadIndex].Finished = true;
            this.checkFileUploadsFinished();
          }
        });
    }
  }

  checkFileUploadsFinished() {
    const unfinishedUploadProgressItems = this.fileUploadProgressItems?.find(x => !x.Finished);
    if (!unfinishedUploadProgressItems)
      this.retrieveProductPhotos();
  }

  hideFileUploadProgress(fileUploadProgress: FileUploadProgress) {
    this.fileUploadProgressItems[fileUploadProgress.Number - 1].Visible = false;
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.retrieveProductPhotos();
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
      this.formLoading = false;
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
    this.formLoading = false;
  }
}