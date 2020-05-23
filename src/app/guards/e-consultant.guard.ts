import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EConsultantGuard implements CanActivate {
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

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    return this.isUserLoggedIn()
    .then(result => {
      if (result) {
        var user = JSON.parse(localStorage.getItem('userOfKardio'));
        if (user.role_type == 'eConsultant') {
          return true
        }
        else {
          this.router.navigate(['/not-found'])
        }
      }
      else
        this.router.navigate(['/auth/login']);

    }).catch(error => {
        this.router.navigate(['/auth/login']);
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
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
}
