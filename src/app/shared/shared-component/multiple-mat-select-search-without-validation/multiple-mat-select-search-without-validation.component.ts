import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild,Input,Output,EventEmitter, forwardRef} from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LocalDataService } from 'src/app/_services/local-data.service';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-multiple-mat-select-search-without-validation',
  templateUrl: './multiple-mat-select-search-without-validation.component.html',
  styleUrls: ['./multiple-mat-select-search-without-validation.component.scss'],
  inputs:['disabledFlag','records','recordType','recordName','recordId','dropdownLabelError','dropdownPlaceHolder']
})
export class MultipleMatSelectSearchWithoutValidationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() clicked=new EventEmitter<any>();

 public records:any[];
 public recordType:any;
 public recordName:any;
 public dropdownPlaceHolder:any;
 public dropdownLabelError:any;
 public disabledFlag:any;
 public recordId:any;
 public defaultValue:any;
//  public requiredFlag:any;
//  public caller:any;
 // public requiredError:any;
 /** control for the selected bank */
 value:any;
 
 public recordCtrl: FormControl = new FormControl();

 /** list of records filtered by search keyword */
 public filteredRecords: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);


 /** control for the MatSelect filter keyword */
 public recordFilterCtrl: FormControl = new FormControl();


 @ViewChild('multipleSelect', { static: true }) multipleSelect: MatSelect;

 /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();


 constructor(public localDataService: LocalDataService,
  public commonService:CommonService) { 
  //  this.disabled=false
 }
 

 Onchanged(event){
   console.log("event in Onchanged",event)
   if(event[0] || event )
this.clicked.emit(event);
else
 return
 }

 ngOnInit() {
   debugger;
  //  console.log("caller",this.caller)
   this.value=this.defaultValue;
   //console.log(this.recordType+" => ",this.records)
   // load the initial record list
  //  if(this.records.length!=0)
   this.filteredRecords.next(this.records.slice());

   // listen for search field value changes
   this.recordFilterCtrl.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(() => {
       this.filterrecords();
     });
 }

 ngAfterViewInit() {
 }

 ngOnDestroy() {
   this._onDestroy.next();
   this._onDestroy.complete();
 }


 protected filterrecords() {
   debugger;
   if (!this.records) {
     this.filteredRecords.next(this.records.slice());
     return;
   }
   // get the search keyword
   let search = this.recordFilterCtrl.value;
   if (!search) {
     this.filteredRecords.next(this.records.slice());
     return;
   } else {
     search = search.toLowerCase();
   }
   // filter the records
   this.filteredRecords.next(
     this.records.filter(record => record[this.recordName].toLowerCase().indexOf(search) > -1)
   );
 }

}
