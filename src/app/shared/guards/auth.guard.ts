import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';

import { AuthenticationService } from 'src/app/shared/services/Authentication.service';

@Injectable({ providedIn: 'root' })
class PermissionsService {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const merchant = this.authenticationService.authenticatedMerchant;
        if (merchant) {
            return true;
        }

        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}