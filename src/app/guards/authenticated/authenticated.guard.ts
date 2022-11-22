import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

	constructor(
        private router: Router,
		private localStorageService: LocalStorageService
	) {

	}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		const token = this.localStorageService.getKeyFromLocalStorage('jatkn');

		if (token) {
			return true;
		} else {
			return this.router.navigateByUrl('/auth/login');
		}
	}
}
