import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Category } from 'src/app/shared/models/Category.model';
import { CategoryService } from 'src/app/shared/services/Category.service';
import { Constants } from 'src/app/shared/Constants';
import { DialogDeleteComponent } from 'src/app/shared/dialogs/delete/dialog.delete.component';
import { Environment } from 'src/app/shared/environments/Environment';
import { FileSizePipe } from 'src/app/shared/pipes/FileSize.pipe';
import { FileUploadProgress } from 'src/app/shared/models/system/FileUploadProgress.model';
import { GetProductsParameters } from 'src/app/shared/models/parameters/GetProductsParameters.model';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Product } from 'src/app/shared/models/Product.model';
import { ProductPhotoService } from 'src/app/shared/services/ProductPhoto.service';
import { ProductService } from 'src/app/shared/services/Product.service';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-catalog-product-list',
  templateUrl: './product-photo-list.component.html',
  styleUrl: './product-photo-list.component.scss'
})

export class ControlPanelCatalogProductPhotoListComponent {
  public snackBarRef: MatSnackBarRef<TextOnlySnackBar> | undefined;
  public queryStringProductId: string | null = '';
  public queryStringShopId: string | null = '';

  environment = Environment;
  constants = Constants;

  public form!: FormGroup;
  public controlFile = new FormControl('');

  public shop: Shop | undefined;
  public product: Product | undefined;

  public fileUploadCounter = 0;
  public fileUploadProgressItems: FileUploadProgress[] = [];
  public fileUploadAllowedExtensionsAccept: string = '';

  constructor(
    private dialog: MatDialog,
    private fileSizePipe: FileSizePipe,
    private productService: ProductService,
    private productPhotoService: ProductPhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup([
      this.controlFile
    ]);
  }

  ngOnInit() {
    this.queryStringProductId = this.route.snapshot.paramMap.get('productId');
    this.queryStringShopId = this.route.snapshot.paramMap.get('shopId');

    if (this.queryStringProductId)
      this.productService.getById(this.queryStringProductId).subscribe(product => this.product = product.Product);

    Constants.UPLOAD_ALLOWED_EXTENSIONS.forEach(extension => {
      this.fileUploadAllowedExtensionsAccept += (this.fileUploadAllowedExtensionsAccept != '' ? ',' : '') + `.${extension}`
    });
  }

  ngOnDestroy(): void {
    this.snackBarRef?.dismiss();
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
        continue;
      }

      if (fileToUpload.size > Constants.UPLOAD_MAXIMUM_FILE_SIZE) {
        this.fileUploadProgressItems[fileUploadIndex].Message = 'File was too large. The maximum allowed file size is ' + this.fileSizePipe.transform(Constants.UPLOAD_MAXIMUM_FILE_SIZE);
        this.fileUploadProgressItems[fileUploadIndex].Finished = true;
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
          error: (err: HttpErrorResponse) => {
            this.fileUploadProgressItems[fileUploadIndex].Message = err.message;
            this.fileUploadProgressItems[fileUploadIndex].Finished = true;
          },
          complete: () => this.fileUploadProgressItems[fileUploadIndex].Finished = true
        });

    }
  }

  deleteFileUploadProgress(fileUploadProgress: FileUploadProgress) {
    this.fileUploadProgressItems[fileUploadProgress.Number - 1].Visible = false;
  }

  deleteElement(element: Product) {
    const dialogDelete = this.dialog.open(DialogDeleteComponent);
    const instance = dialogDelete.componentInstance;
    instance.dialogMessage = `Are you sure you want to delete photo '${element.Name}'?`;

    dialogDelete.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(element.Id).subscribe({
          next: result => this.handleOnSubmitResult(result),
          error: error => this.handleOnSubmitError(error),
          complete: () => dialogDelete.close()
        });
      }
    });
  }

  handleOnSubmitResult(result: MutationResult) {
    if (result.Success) {
      this.router.navigate(['/control-panel/catalog/products']);
    } else {
      this.snackBarRef = this.snackBar.open(result.Message, 'Close', { panelClass: ['error-snackbar'] });
    }
  }

  handleOnSubmitError(error: string) {
    this.snackBarRef = this.snackBar.open(error, 'Close', { panelClass: ['error-snackbar'] });
  }
}