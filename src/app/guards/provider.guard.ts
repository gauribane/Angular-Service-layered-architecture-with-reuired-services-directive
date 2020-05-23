import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements  CanActivate  {

/**
 * @constructor
 * @param router Router  Instance created 
 *  
 */
  	constructor(public router:Router){}

/**
 * @Function canActivate
 * @param route ActivatedRouteSnapshot
 * @returns Promise
 */
	canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
					return this.isUserLoggedIn()
					.then(result=>{
						if (result) {
							var user = JSON.parse(localStorage.getItem('userOfKardio'));
							if (user.role_type == 'Provider') {
								return true
							}
							else  {
								// return false;
								this.router.navigate(['/not-found'])
							}
						}
						else
							this.router.navigate(['/auth/login']);
					}).catch(error=>{
							this.router.navigate(['/auth/login']);
							return error;
					})
	 }

/**
 * @Function isUserLoggedIn
 * @returns Promise
 * 
 */
	isUserLoggedIn():Promise<boolean>{
				return new Promise ((resolve,reject) =>{
						if(!localStorage.getItem('accessTokenOfKardio')){
							return reject(true);
						}
							resolve(true);	
				});
	}
  
}
