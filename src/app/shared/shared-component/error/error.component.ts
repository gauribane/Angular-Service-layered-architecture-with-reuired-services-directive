import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(public commonService:CommonService,
    public router:Router) { }

  ngOnInit() {
  }

  backToHome(){
    switch(this.commonService.loggedInUser.role_name){
      case 'Super Admin' :
          this.router.navigate(['/superadmin/dashboard']);
          break;
      case 'Hospital Admin' :
              this.router.navigate(['/hospitaladmin/dashboard']);
              break;
      case 'Provider' :
          this.router.navigate(['/provider/provider-dashboard']);
          break;
      default: this.router.navigate(['/auth/login']);            
    }
  }

}
