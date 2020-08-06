import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild,Input,Output,EventEmitter, forwardRef} from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
// import { Bank, BANKS } from '../demo-data';
import { LocalDataService } from 'src/app/_services/local-data.service';

// export interface Country {
//   id: string;
//   country_name: string;
// }

@Component({
  selector: 'app-multiple-mat-select-search',
  templateUrl: './multiple-mat-select-search.component.html',
  styleUrls: ['./multiple-mat-select-search.component.scss'],
  inputs:['callerName','splittedorgArrayClone','multipleFlag','disabledFlag','requiredFlag','records','recordType','defaultValue','recordName','recordId','dropdownLabelError','dropdownPlaceHolder'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>MultipleMatSelectSearchComponent),
      multi:true
    }
  ]
})


export class MultipleMatSelectSearchComponent implements OnInit, AfterViewInit, OnDestroy,ControlValueAccessor {
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
  public multipleFlag:any;
  public splittedorgArrayClone:any;
  public callerName:any;
  // public requiredError:any;
  /** control for the selected bank */
  value:any;
  
  public recordCtrl: FormControl = new FormControl();

  /** list of records filtered by search keyword */
  public filteredRecords: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);


  /** control for the MatSelect filter keyword */
  public recordFilterCtrl: FormControl = new FormControl();


  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(public localDataService: LocalDataService) { 
    this.disabled=false
  }
  writeValue(obj: any): void {
    debugger;
    console.log("obj in writeValue",obj);
    console.log("defaultValue",this.defaultValue)
    console.log("records in writevalue",this.records)
    console.log("multipleFlag in writevalue",this.multipleFlag)
    if (obj != null && obj!='') {
      this.value = obj;
    }
     else{
      //  if(this.multipleFlag)
     this.value=this.defaultValue;
    //  else
    //  this.value=this.defaultValue[0];
     }
  }
  registerOnChange(fn: any): void {
    debugger;
    // console.log("hi in registerOnChange ")
    this.onChange=fn;
  }

  
  registerOnTouched(fn: any): void {
    this.onTouched=fn;
  }
  setDisabledState?(isDisabled: Boolean): void {
    this.disabled=isDisabled;
  }

  Onchanged(event,org_id){
    debugger;
    console.log("event in Onchanged",event)
    console.log("actevent in Onchanged",org_id)
    console.log("value in Onchanged",this.value)
    // if(this.multipleFlag)
    if(event[0] || event )
 this.clicked.emit({event:event,org_id:org_id});
 else 
 return;
//  else
//  this.clicked.emit(event[0]);
  }

    /**
   * Disable already selected org
   * @param org_id 
   */
  chkForDisabled(org_id) {
    // org_id
    // debugger;
    
    if (this.callerName && this.callerName == 'edit')
      return false;
    var temp = this.splittedorgArrayClone.filter(obj => {
      return (obj === org_id ? true : false)
    })
    if (temp.length != 0)
      return true;
    else
      return false;

  }

  ngOnInit() {
    console.log("disabledFlag",this.disabledFlag)
    console.log(this.recordType+" => ",this.records)
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
      this.records.filter(bank => bank[this.recordName].toLowerCase().indexOf(search) > -1)
    );
  }
}
