import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-box',
  templateUrl: './confirmation-dialog-box.component.html',
  styleUrls: ['./confirmation-dialog-box.component.scss']
})
export class ConfirmationDialogBoxComponent implements OnInit {

  /**
   * modalData title , latitude, longitude
   */
  modalData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  this.modalData = data;
  // //console.log(this.modalData);
  }
  ngOnInit() {
  }

}
