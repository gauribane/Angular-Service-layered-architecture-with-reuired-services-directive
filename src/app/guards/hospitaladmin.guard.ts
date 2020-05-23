import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class HospitaladminGuard implements CanActivate {

  /**
   * @constructor
   * @param router Router instance 
   *
   */
  constructor(
    public router: Router,
    public location: Location
  ) { }

  /**
   * @Function canActivate
   * @param route ActivatedRouteSnapshot instance
   * 
   */
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isUserLoggedIn()
      .then(result => {
        //debugger;
        if (result) {
          var user = JSON.parse(localStorage.getItem('userOfKardio'));
          if (user.role_name == 'Hospital Admin') {
            return true
          }
          else {
            this.router.navigate(['/not-found'])
            // return false;
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

}
