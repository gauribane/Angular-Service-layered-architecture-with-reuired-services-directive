import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild,Input,Output,EventEmitter, forwardRef} from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { LocalDataService } from 'src/app/_services/local-data.service';

@Component({
  selector: 'app-single-mat-select-search-common',
  templateUrl: './single-mat-select-search-common.component.html',
  styleUrls: ['./single-mat-select-search-common.component.scss'],
  inputs:['caller','disabledFlag','requiredFlag','records','recordType','defaultValue','recordName','recordId','dropdownLabelError','dropdownPlaceHolder'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>SingleMatSelectSearchCommonComponent),
      multi:true
    }
  ]
})
export class SingleMatSelectSearchCommonComponent implements OnInit, AfterViewInit, OnDestroy,ControlValueAccessor {
   @Output() clicked=new EventEmitter<any>();
  onChange:() => void;
  onTouched:() => void;
  disabled:Boolean;
  public records:any[];
  public recordType:any;
  public recordName:any;
  public dropdownPlaceHolder:any;
  public dropdownLabelError:any;
  public disabledFlag:any;
  public recordId:any;
  public defaultValue:any;
  public requiredFlag:any;
  public caller:any;
  // public requiredError:any;
  /** control for the selected bank */
  value:any;
  
  public recordCtrl: FormControl = new FormControl();

  /** list of records filtered by search keyword */
  public filteredRecords: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);


  /** control for the MatSelect filter keyword */
  public recordFilterCtrl: FormControl = new FormControl();


  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(public localDataService: LocalDataService) { 
    this.disabled=false
  }
  writeValue(obj: any): void {
    debugger;
    // console.log("obj in writeValue",obj);
    console.log("defaultValue",this.defaultValue)
    console.log("records in writevalue",this.records)
    if (obj != null && obj !='') {
      this.value = obj;
    }
     else{
     this.value=this.defaultValue;
     }
  }
  registerOnChange(fn: any): void {
    debugger;
    // //console.log("hi in registerOnChange ")
    this.onChange=fn;
  }

  
  registerOnTouched(fn: any): void {
    debugger;
    this.onTouched=fn;
  }
  setDisabledState?(isDisabled: Boolean): void {
    this.disabled=isDisabled;
  }

  Onchanged(event){
    //console.log("event in Onchanged",event)
    if(event)
 this.clicked.emit(event);
 else
 return
  }

  ngOnInit() {
    debugger;
    console.log("caller",this.caller)
    //console.log(this.recordType+" => ",this.records)
    // load the initial record list
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
