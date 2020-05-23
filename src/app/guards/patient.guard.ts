import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class PatientGuard implements CanActivate {

/**
 * @constructor
 * @param router Router instance 
 *
 */
	constructor(public router: Router) {}

/**
 * @Function canActivate
 * @param route ActivatedRouteSnapshot instance
 * 
 */
	canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.isUserLoggedIn()
			.then(result => {
				if (result) {
					var user = JSON.parse(localStorage.getItem('userOfKardio'));
					if (user.userType == 'Provider') {
						return false
					}
					else if (user.userType == 'Patient') {
						return true;
					}
				}
				else
					this.router.navigate(['/auth/patientLogin']);

			}).catch(error => {
					this.router.navigate(['/auth/patientLogin']);
					return error;
			})
	}

/**
 * 
 * @Function isUserLoggedIn
 * @return Promise
 *  
 */
	isUserLoggedIn(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (!localStorage.getItem('accessTokenOfKardio')) {
				return reject(true);
			}
			resolve(true);
		});
	}

}
