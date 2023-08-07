import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { DeliveryMethod } from '../../../shared/models/DeliveryMethod.model';
import { DeliveryMethodService } from 'src/app/shared/services/DeliveryMethod.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { Shop } from 'src/app/shared/models/Shop.model';
import { ShopService } from 'src/app/shared/services/Shop.service';

@Component({
  selector: 'control-panel-configuration-delivery-method',
  templateUrl: './delivery-method.component.html'
})

export class ControlPanelConfigurationDeliveryMethodComponent {
  public controlName = new FormControl('', Validators.required);
  public controlShop = new FormControl('', Validators.required);
  public controlCosts = new FormControl('', Validators.pattern(/^-?\d*[.,]?\d{0,2}$/));

  public deliveryMethod: DeliveryMethod = new DeliveryMethod();
  public environment = Environment;
  public error = '';
  public form!: FormGroup;
  public loading = false;
  public pageTitle = 'Create new delivery method'
  public submitted = false;
  public shops: Shop[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private deliveryMethodService: DeliveryMethodService,
    private shopService: ShopService
  ) {
    this.form = new FormGroup([
      this.controlName,
      this.controlShop
    ]);
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const queryStringDeliveryMethodId = routeParams.get('deliveryMethodId');

    if (queryStringDeliveryMethodId && queryStringDeliveryMethodId != 'new') {
      this.deliveryMethodService.getById(queryStringDeliveryMethodId).subscribe(x => { this.onRetrieveData(x); });
    }

    this.shopService.getList().subscribe(shops => this.shops = shops);
  }

  onRetrieveData(deliveryMethod: DeliveryMethod) {
    this.deliveryMethod = deliveryMethod;
    this.pageTitle = deliveryMethod.Name;
    this.controlName.setValue(deliveryMethod.Name);
    this.controlShop.setValue(deliveryMethod.Shop.Id);

    if (deliveryMethod.Costs)
      this.controlCosts.setValue(deliveryMethod.Costs.toString());
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;

    const deliveryMethodToUpdate: DeliveryMethod = Object.assign({}, this.deliveryMethod);
    deliveryMethodToUpdate.Name = this.controlName.value!;
    //deliveryMethodToUpdate.Shop = Shop{  };

    /*
    this.shopService.create(shopToUpdate)
      .subscribe({
        next: () => {
          // wprls
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });*/
  }
}