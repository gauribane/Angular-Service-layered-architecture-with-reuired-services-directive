// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material';

// @Component({
//   selector: 'app-confirmation-dialog',
//   templateUrl: './confirmation-dialog.component.html',
//   styleUrls: ['./confirmation-dialog.component.css']
// })
// export class ConfirmationDialogComponent {

//   modalTitle: string;

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
//     this.modalTitle = data.title;
//     //  (data);
//   }

// }

import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

    heading: string;
    message: any;
    callback: any;
    constructor(public bsModalRef: BsModalRef, private sanitizer: DomSanitizer, private router: Router,) {
    }
    ngOnInit() {
       // this.message = this.sanitizer.bypassSecurityTrustHtml(this.message);
    }

    confirm(): void {
        this.callback({action:'Confirm'});
        this.bsModalRef.hide();
        // if(this.message.changingThisBreaksApplicationSecurity=='Something went wrong. Please register again')
        // {
        //     window.location.reload();
        // }
    }

    decline(): void {
        this.callback({action:'Decline'});
        this.bsModalRef.hide();
    }
}

