import { Component } from '@angular/core';
import { LoaderService } from './_services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConnectionStatusService } from './_services/connection-status.service';
import { SnackbarService } from './_services/snackbar.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:"Hello World";
  status = 'Internet Connected';
  isConnected = true;
  show: boolean = false;
  constructor(private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    public ldService: LoaderService,
    public connectionStatusService: ConnectionStatusService,
    public snackbarService: SnackbarService) {
    this.ngxSpinnerService.hide();
    this.ldService.loaderService.subscribe((show: boolean) => {
      if (show) {
        this.ngxSpinnerService.show();
      } else {
        this.ngxSpinnerService.hide();
      }
    });


    this.connectionStatusService.monitor().subscribe(isConnected => {
      if (this.isConnected !== isConnected) {
        this.isConnected = isConnected;
        if (this.isConnected) {
          // this.status = "ONLINE";
          this.status = "Internet Connected";
          this.snackbarService.showSuccess(this.status);
        }
        else {
          // this.status = "OFFLINE";
          this.status="Check your Connection & Try Again"
          this.snackbarService.showWarning(this.status);
        }
      }
    })
  }
}
