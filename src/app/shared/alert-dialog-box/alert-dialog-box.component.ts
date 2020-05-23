import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MatDialog,  MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog-box',
  templateUrl: './alert-dialog-box.component.html',
  styleUrls: ['./alert-dialog-box.component.scss']
})
export class AlertDialogBoxComponent implements OnInit {

  message: string = "Server Error, Try later";
  cancelButtonText = "OK"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogBoxComponent>) {
      dialogRef.disableClose = true;
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('300vw','300vw')
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
  ngOnInit() {
  }

}
