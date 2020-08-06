import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  ValidatorFn
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";

// Service
import { CommonService } from "../../../_services/common.service";
import { SnackbarService } from "../../../_services/snackbar.service";
import { LocalDataService } from "../../../_services/local-data.service";
import { ApiListService } from "../../../_services/api-list.service";

import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { resolve } from "q";
import { DomSanitizer } from "@angular/platform-browser";
import { setOffsetToParsedOffset } from "ngx-bootstrap/chronos/units/offset";
import { UserServiceService } from "src/app/_services/user-service.service";
import { Observable, ObservableInput } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { NestedOptionHost } from 'devextreme-angular';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );
    return invalidCtrl || invalidParent;
  }
}


@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  orgDataFlag: boolean = false;
  logoUpdatedFlag;
  emailAvailable;
  passwordValue;
  submitted;
  success;
  userOldData: any;
  show = false;
  passwordData;
  disabled = true;
  userOldDataCopy: any;
  LoggedInUser;

  userProfile: any = {};
  userProfileData: any = {};

  org_logo: any = {};
  filesData: any = {};
  uploadFile = [];
  userPassword: any = {};
  currentDate: Date;
  uploadedFile: boolean = false;
  pdfSource: any;
  pdfSourceImage: any;
  editprofileDuplicate: any;

  editprofile: FormGroup;
  // newEditProfile:FormGroup;
  passwordUpdateData: FormGroup;
  orgdetails: FormGroup;
  firstname;
  country_code;
  landline;
  lastname;
  fullname;
  middlename;
  email;
  phone;
  role;
  dob;
  gender;
  title;
  speciality;
  subspeciality;
  new_password;
  password;
  confirmpassword;
  dateofbirth;
  aboutme;
  certificates;
  _name;
  Faxnumber;
  org_country;
  org_state;
  org_city;
  org_landline;
  org_address_line1;
  org_address_line2;

  button_color;
  themeColor;
  org_address;

  city;
  state;
  state_id;
  country_id;
  city_id;
  zip_code;
  address_line1;
  address_line2;
  stateList = [];
  stateListFororg=[]
  cityList = [];
  cityListFororg=[]
  old_primary_color: string = "";
  old_secondary_color: string = "";
  old_text_color: string = "";

  updated_primary_color: string = "";
  updated_secondary_color: string = "";
  updated_text_color = "";

  croppedImage: any = "";
  cropperReady: any = "";
  imageChangedEvent: any = "";
  imageChangedEvent1: any = "";

  isUpdated: boolean = false;
  updatedBasicInfo: boolean = false;
  oldPasswordMatchflag: boolean = false;
  passwordFlagSet: boolean = false;
  countryList: any = [];
  country;
  userData: any;
  oldPassFlag: boolean = false;
  genderList = [
    { value: "Male", type: "Male" },
    { value: "Female", type: "Female" }
  ];
  stateGroups: any[];
  countryGroups: any[];
  cityGroups: any[];

  stateGroupOptions: Observable<any[]>;
  countryGroupOptions: Observable<any[]>;
  cityGroupOptions: Observable<any[]>;

  @ViewChild("passwordForm", { static: false }) passwordForm: NgForm;
  @ViewChild("orgRegistration", { static: false })
  orgRegistration: NgForm;

  primaryColorPicker = document.getElementById("color-picker-primary");
  imageCropData: any;
  orgCropData: any;
  visibilityIconForNew:any="visibility_off";
  visibilityIconForConfirm:any="visibility_off";
  visibilityIconForOld:any="visibility_off";
  flagSet: boolean = true;

  /**
   *
   * @contructor
   * @param commonService
   * @param snackbarService
   * @param localDataService
   * @param datePipe
   * @param apiListService
   *
   */
  constructor(
    public commonService: CommonService,
    private snackbarService: SnackbarService,
    private localDataService: LocalDataService,
    public datePipe: DatePipe,
    private apiListService: ApiListService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public userServiceService: UserServiceService
  ) {
    this.uploadFile = [];
    this.userData = this.commonService.loggedInUser;
    this.imageCropData = {};
    this.orgCropData = {};
  }

  /**
   * @ngOnInit
   * @MethodCalled createFormControls() : validations
   * @MethodCalled editProfileDataGroup() : user profile form data
   * @MethodCalled updatePasswordGroup() : user password form data
   * @MethodCalled setEditProfileData() : default data set / old data set
   *
   */
  ngOnInit() {
    this.setOldThemeColor();
    this.getAllCountries();
    this.setEditProfileData();
    
    this.getCurrentUserData();
    this.createFormControls();
    this.maxdate();
    this.editProfileDataGroup();
    this.updatePasswordGroup();
    this.orgDataGroup();
  }

  scrollWin() {
    window.scrollTo(0, 0);
  }

  OnChanged(value,obj,str,callerName,caller){
    debugger;
    this.flagSetAsUpdated()
    switch(callerName){
      case 'country': 
      obj.country_id=value;
          this.getAllState(value,obj,str,caller)
        break;
      case 'state':
        obj.state_id=value;
        
       this.getAllCity(value,obj,str,caller)
        break;
      case 'city':
      console.log("editprofile",this.editprofile)
        obj.city_id=value;
        break;    
    }
  
  }


  /**
   *
   * @Function createFormControls
   *
   */
  createFormControls() {
    this.firstname = new FormControl("", [
      Validators.required,
      Validators.pattern(this.localDataService.Firstname.pattern),
      Validators.minLength(this.localDataService.Firstname.minlength),
      Validators.maxLength(this.localDataService.Firstname.maxlength)
    ]);

    this.lastname = new FormControl("", [
      Validators.required,
      Validators.pattern(this.localDataService.Lastname.pattern),
      Validators.minLength(this.localDataService.Lastname.minlength),
      Validators.maxLength(this.localDataService.Lastname.maxlength)
    ]);

    this.middlename = new FormControl("", [
      Validators.pattern(this.localDataService.Middlename.pattern),
      Validators.minLength(this.localDataService.Middlename.minlength),
      Validators.maxLength(this.localDataService.Middlename.maxlength)
    ]);

    this.fullname = new FormControl("", [
      Validators.pattern(this.localDataService.FullName.pattern),
      Validators.minLength(this.localDataService.FullName.minlength),
      Validators.maxLength(this.localDataService.FullName.maxlength)
    ]);

    this.email = new FormControl({ value: "", disabled: true });

    this.phone = new FormControl("", [
      Validators.required,
      Validators.maxLength(this.localDataService.Phone.maxlength),
      Validators.minLength(this.localDataService.Phone.minlength)
    ]);
    this.role = new FormControl({ value: "", disabled: true });
    this.title = new FormControl("");
    this.speciality = new FormControl("");
    this.subspeciality = new FormControl("");
    this.dob = new FormControl("", [
      Validators.required
    ]);
    this.gender = new FormControl("", [
      Validators.required,
      Validators.pattern(this.localDataService.Gender.pattern)
    ]);
    this.aboutme = new FormControl("");
    this.country = new FormControl("", [Validators.required]);
    this.certificates = new FormControl(null, []);
    this._name = new FormControl("", [Validators.required]);
    this.Faxnumber=new FormControl("", [Validators.required]);
    this.org_country = new FormControl("", [Validators.required]);
    this.org_address = new FormControl("", [Validators.required]);
    this.address_line1 = new FormControl("", [Validators.required]);
    this.address_line2 = new FormControl("");
    this.country = new FormControl("", [Validators.required]);
    this.state = new FormControl("");
    this.city = new FormControl("");

    this.org_state = new FormControl("");
    this.org_city = new FormControl("");
    this.org_landline=new FormControl("");
    this.org_address_line1 = new FormControl("", [Validators.required]);
    this.org_address_line2 = new FormControl("");
    this.landline=new FormControl("");
    this.country_code=new FormControl("", [Validators.required]);
  }

  matcher = new MyErrorStateMatcher(); // created instance of the matcher
  matcher1 = new MyErrorStateMatcher();

  /**
   * @Function getErrorMessage
   */
  getErrorMessage() {
    return this.new_password.hasError("required")
      ? "New Password is required"
      : "";
  }

  /**
   *
   * @Function setEditProfileData
   *
   */
  setEditProfileData() {
    this.userProfile.image_name = "";
    this.userProfile.image = this.commonService.defaultImage;
    this.userProfile.isUpdated = false;

    this.org_logo.isUpdated = false;
    this.org_logo.logo_name = "";
    this.org_logo.logo_image = this.commonService.defaultLogoImage;

    this.filesData.isUpdated = false;
    this.filesData.certificates = [];
    this.filesData.deletedCertificates = [];
  }

  /**
   * @Function setOldThemeColor
   *
   */
  setOldThemeColor() {
    var LoggedInUser = this.commonService.loggedInUser;
    this.old_primary_color = LoggedInUser.primary_color;
    this.old_secondary_color = LoggedInUser.secondary_color;
    this.old_text_color = LoggedInUser.text_color;
  }

  /**
   *
   * @Function getCurrentUserData
   * @Description get user id from local storage first and then call getCurrentUserData By Id.
   *
   */
  getCurrentUserData() {
    var userId = {
      id: this.commonService.loggedInUser.id,
      user_id: this.commonService.loggedInUser.id
    };
    this.commonService
      .apiCall(this.apiListService.getUserDataById, userId)
      .then((res: any) => {
        debugger;
        this.userOldData = res.result;
        this.userOldData.isUpdated=false;
        this.userOldData.country_id=this.userOldData.country_id?this.userOldData.country_id:this.localDataService.defaultCountry;
        this.getAllState(this.userOldData.country_id,null,null,'User');
        this.getAllCity(this.userOldData.state_id,null,null,'User');
      

        this.uploadFile = this.userOldData.certificateList;
        this.userProfile.image = this.userOldData.image;
        this.userProfile.isUpdated=false;
        if(this.commonService.loggedInUser.role_name =='eClinic Admin'){
          this.org_logo.logo_image = this.userOldData.clinic_image.file;
          this.userOldData.clinic_country_id=this.userOldData.clinic_country_id?this.userOldData.clinic_country_id:this.localDataService.defaultCountry;
        this.getAllState(this.userOldData.clinic_country_id,null,null,null);
        this.getAllCity(this.userOldData.clinic_state_id,null,null,null);
      }
        else{
          this.org_logo.logo_image = this.userOldData.org_image.file;
          this.org_logo.isUpdated=false;
          this.userOldData.org_country_id=this.userOldData.org_country_id?this.userOldData.org_country_id:this.localDataService.defaultCountry;
        this.getAllState(this.userOldData.org_country_id,null,null,null);
        this.getAllCity(this.userOldData.org_state_id,null,null,null);
    }
        this.setOldPasswordData();
      })
      .catch(err => {
      });
  }

//   onTabChanged(event){
// //console.log("event",event)
//   }

  // callRequiredData(callerName){
  //   if(callerName=='User Details'){
  //   this.getAllState(this.userOldData.country_id);
  //       this.getAllCity(this.userOldData.state_id);
  //   }else{
  //     this.getAllState(this.userOldData.org_country_id);
  //       this.getAllCity(this.userOldData.org_state_id);
  //   }
  // }

  /**
   *
   * @Function getAllCountries
   * @Description get all the countries json
   *
   */
  getAllCountries() {
    this.countryList=this.commonService.loggedInUser.countryList;
    // this.commonService
    //   .apiCall(this.apiListService.getAllCountries, {
    //     id: this.commonService.loggedInUser.id,
    //     searchText: "",
    //     isDropdown: true
    //   })
    //   .then((res: any) => {
    //     this.countryList = res.result;
    //   })
    //   .catch(err => {});
  }

  /**
   *
   * @Function setOldPasswordData
   * @Description set default data in case user don't want to set new password assign old password as new pasword
   * instad of sending null / empty in new_password
   *
   *
   *  */
  setOldPasswordData() {
    this.userPassword.password = this.userOldData.password;
    this.userPassword.new_password = this.userOldData.password;
    this.userPassword.isUpdated = false;
  }

  /**
   * @Function editProfileDataGroup
   *
   */
  editProfileDataGroup() {
   
    this.editprofile = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      middlename: this.middlename,
      fullname: this.fullname,
      email:this.email,
      phone: this.phone,
      role: this.role,
      dob: this.dob,
      gender: this.gender,
      aboutme: this.aboutme,
      title: this.title,
      speciality: this.speciality,
      subspeciality: this.subspeciality,
      address_line1: this.address_line1,
      address_line2: this.address_line2,
      country: this.country,
      state: this.state,
      city: this.city,
      landline:this.landline,
      country_code:this.country_code
    });
  }

  /**
   * @Function orgDataGroup
   *
   */
  orgDataGroup() {
    this.orgdetails = new FormGroup({
      name: this._name,
      emai:this.email,
      Faxnumber:this.Faxnumber,
      org_country: this.org_country,
      org_address_line1: this.org_address_line1,
      org_address_line2: this.org_address_line2,
      org_state: this.org_state,
      org_city: this.org_city,
      org_landline:this.org_landline
    });
  }

  /**
   *
   * @Function updatePasswordGroup
   * @desc password form group
   *
   */
  updatePasswordGroup() {
    this.passwordUpdateData = this.formBuilder.group(
      {
        password: [{ value: "" },[Validators.required]],
        new_password: [null, [Validators.required]],
        confirmpassword: [null, [Validators.required]]
      },
      {
        validator: [this.checkPasswords]
      }
    );
  }

  /**
   * @Function checkAlreadyUsePassword
   * @param control
   * @desc check old password and currently enter new password is not same
   *
   */
  checkAlredyUsePassword(event) {
    this.passwordUpdateData.get("password").value === event.target.value
      ? { same: true }
      : null;
  }


  /**
   * @Function chPassword
   * @param control
   *
   *
   */
  checkPassword(control) {
    let enteredPassword = control.value;
    if (enteredPassword) {
      return enteredPassword === this.userOldData.password ? { notSame: true } : null;
    } else {
      return null;
    }
    // let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[0-9])(?=.{8})/;
    // return !passwordCheck.test(enteredPassword) && enteredPassword
    //   ? { requirements: true }
    //   : null;
  }

  /**
   *
   * @function getErrorPassword
   * @desc check form control is invalid then called it
   *
   *
   */
  getErrorPassword() {
    return this.passwordUpdateData.get("new_password").hasError("required")
      ? this.localDataService.getErrorPassword.requiredError
      : this.passwordUpdateData.get("new_password").hasError("requirements")
      ? this.localDataService.getErrorPassword.reqyurementError
      : "";
  }

  /**
   * @Function checkPasswords
   * @param group
   * @desc password match or not
   *
   */
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let oldPass = group.controls.password.value;
    let pass = group.controls.new_password.value;
    let confirmPass = group.controls.confirmpassword.value;
    if (confirmPass && group.controls.confirmpassword.value) {
      return confirmPass !== pass ? { notSame: true } : null;
    } else {
      return null;
    }
  }

  checkOldpassword(group: FormGroup) {
    // d
    // let oldPass = group.controls.password.value;
    // let pass = group.controls.new_password.value;
    return this.userOldData.password == this.userOldData.new_password ? { same: true } : null;
  }

  /**
   *
   * @Function editprofile
   * @param editprofile New data
   *
   */
  editOnSubmit(editprofile) {
    this.dateFormat();
    this.submitted = true;
    if (editprofile.invalid) {
      this.scrollToTop();
      return;
    }
    this.success = true;
    this.editprofileDuplicate = editprofile;
    this.userOldData["dob"] = editprofile.controls.dob.value;
    this.userOldData["address_info"] = {
      address_line1: editprofile.controls.address_line1.value,
      address_line2: editprofile.controls.address_line2.value,
      city: editprofile.controls.city.value,
      state: editprofile.controls.state.value,
      country: editprofile.controls.country.value,
      zip_code: this.userOldData.zip_code
    };
    var updatedData = {
      userImageInfo: this.userProfile,
      userBasicInfo: this.userOldData,
      userPassword: this.userPassword,
      certificateList: this.filesData
    };
    this.finalUploadCertificates();
    updatedData.userBasicInfo.isUpdated = this.updatedBasicInfo;
    updatedData["id"] = this.commonService.loggedInUser.id;
    this.sendUpdateData(updatedData,'User Profile');
  }

  scrollToTop() {
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  updateLocalStorageImageNameLogo() {
    this.userData["fullname"] =
      this.userOldData.lastname + ", " + this.userOldData.firstname;
    this.userData["image"] = this.userProfile.image;
    this.commonService.setDataInLocalStorageAndObservable(
      "userData",
      this.userData
    );
  }

  /**
   *
   * @Function editorgDetails
   * @param orgDetails
   *
   * #3467a7
   * #5b7ca5
   *
   *
   */
  editorgDetails(formData) {
    this.userData["fullname"] = this.userData.fullname;
    this.userData["image"] = this.userProfile.image;
    this.submitted = true;
    if (formData.invalid) {
      return;
    }
    this.success = true;

    this.updated_primary_color == undefined || null || " "
      ? (formData.value["primary_color"] = this.old_primary_color)
      : (formData.value["primary_color"] = this.updated_primary_color);

    this.updated_secondary_color == undefined || null || " "
      ? (formData.value["secondary_color"] = this.old_secondary_color)
      : (formData.value["secondary_color"] = this.updated_secondary_color);

    this.updated_text_color == undefined || null || " "
      ? (formData.value["text_color"] = this.old_text_color)
      : (formData.value["text_color"] = this.updated_text_color);

  if(this.commonService.loggedInUser.role_name =='org Admin'){
      formData.value['org_address_line1']= this.orgdetails.controls.org_address_line1.value,
      formData.value['org_address_line2']= this.orgdetails.controls.org_address_line2.value,
      formData.value['org_city_id']= this.orgdetails.controls.org_city.value,
      formData.value['org_state_id']= this.orgdetails.controls.org_state.value,
      formData.value['org_country_id']= this.orgdetails.controls.org_country.value,
      formData.value['org_zip_code']= this.userOldData.org_zip_code
    // };
    formData.value["id"] = this.commonService.loggedInUser.id;
    formData.value["org_id"] = this.userOldData.id;
   formData.value["org_name"]=this.userOldData.name;
   formData.value["org_landline"] = this.userOldData.org_landline;
    formData.value["fax_number"] = this.userOldData.fax_number;
    formData.value["org_image"]={
      file:this.org_logo.logo_image,
      file_name:this.org_logo.logo_name,
      is_updated:this.org_logo.isUpdated,
      file_type:this.org_logo.file_type
    }
    this.orgUpdateData(formData.value);
  }else{
    formData.value['clinic_address_line1']= this.orgdetails.controls.org_address_line1.value,
    formData.value['clinic_address_line2']= this.orgdetails.controls.org_address_line2.value,
    formData.value['clinic_city_id']= this.orgdetails.controls.org_city.value,
    formData.value['clinic_state_id']= this.orgdetails.controls.org_state.value,
    formData.value['clinic_country_id']= this.orgdetails.controls.org_country.value,
    formData.value['clinic_zip_code']= this.userOldData.clinic_zip_code;
  // };
  formData.value["id"] = this.commonService.loggedInUser.id;
  formData.value["clinic_id"] = this.userOldData.id;
 formData.value["clinic_name"]=this.userOldData.name;
  formData.value["clinic_landline"] = this.userOldData.clinic_landline;
  formData.value["clinic_fax_number"] = this.userOldData.fax_number;
  formData.value["clinic_image"]={
    file:this.org_logo.logo_image,
    file_name:this.org_logo.logo_name,
    is_updated:this.org_logo.isUpdated,
    file_type:this.org_logo.file_type
  }
  this.eClinicUpdateData(formData.value);
  }
  }

  orgUpdateData(formData) {
    if (this.editprofile.valid) {
      this.editOnSubmit(this.editprofile);
    }
    if (this.passwordUpdateData.valid) {
      this.passwordOnSubmit(this.passwordUpdateData);
    }
    //console.log("formData",formData)

    this.commonService
      .apiCall(this.apiListService.updateorg, formData)
      .then((res: any) => {
        this.snackbarService.showSuccess(res.status.message);
        this.updateLocalStorageImageNameLogo();
        this.commonService.setDataInLocalStorageAndObservable(
          "theme",
          this.themeColor
        );
        this.getCurrentUserData();
      })
      .catch(err => {
      });
  }

  eClinicUpdateData(formData) {
    if (this.editprofile.valid) {
      this.editOnSubmit(this.editprofile);
    }
    if (this.passwordUpdateData.valid) {
      this.passwordOnSubmit(this.passwordUpdateData);
    }

    this.commonService
      .apiCall(this.apiListService.eClinicUpdateData, formData)
      .then((res: any) => {
        this.snackbarService.showSuccess(res.status.message);
        this.updateLocalStorageImageNameLogo();
        this.commonService.setDataInLocalStorageAndObservable(
          "theme",
          this.themeColor
        );
        this.getCurrentUserData();
      })
      .catch(err => {
      });
  }

  /**
   * @Function colorChangePrimary on click
   * @param data
   *
   */
  colorChangePrimary(data: any): void {
    var themeColor = {
      "--primary-color":
        data == undefined || null || " " ? this.old_primary_color : data,
      "--secondary-color": this.old_secondary_color,
      "--text-color": data
    };
    this.commonService.setTheme(themeColor);
  }

  /**
   * @Function colorChangeSecondary
   * @param data
   */
  colorChangeSecondary(data: any): void {
    var themeColor = {
      "--primary-color": this.old_primary_color,
      "--secondary-color":
        data == undefined || null || " " ? this.old_secondary_color : data,
      "--text-color": this.old_text_color
    };
    this.commonService.setTheme(themeColor);
  }

  /**
   * @Funciton colorChangeText
   * @param data
   */
  colorChangeText(data: any): void {
    var themeColor = {
      "--primary-color": this.old_primary_color,
      "--secondary-color": this.old_secondary_color,
      "--text-color":
        data == undefined || null || " " ? this.old_text_color : data
    };
    this.commonService.setTheme(themeColor);
  }

  /**
   * @Function setPrimaryColor
   * @param event
   * @param data
   */
  setPrimaryColor(event: string, data: any): void {
    if (data.value !== undefined || null) {
      var themeColor = {
        "--primary-color":
          data.color && data.color == "" ? this.old_primary_color : data.color,
        "--secondary-color": this.old_secondary_color,
        "--text-color": this.old_text_color
      };
      this.commonService.setTheme(themeColor);
      data.value == undefined || null || " "
        ? (this.updated_primary_color = this.old_primary_color)
        : (this.updated_primary_color = data.color);
    }
  }

  /**
   * @Function setSecondaryColor
   * @param event
   * @param data
   */
  setSecondaryColor(event: string, data: any): void {
    if (data.value !== undefined || null) {
      var themeColor = {
        "--primary-color": this.old_primary_color,
        "--secondary-color":
          data.value == undefined || null || " "
            ? this.old_secondary_color
            : data.color,
        "--text-color": this.old_text_color
      };
      this.commonService.setTheme(themeColor);
      data.value == undefined || null || " "
        ? (this.updated_secondary_color = this.old_secondary_color)
        : (this.updated_secondary_color = data.color);
    }
  }

  /**
   * @Function setTextColor
   * @param event
   * @param data
   */
  setTextColor(event: string, data: any): void {
    if (data.value == undefined || null) {
      var themeColor = {
        "--primary-color": this.old_primary_color,
        "--secondary-color": this.old_secondary_color,
        "--text-color":
          data.value == undefined || null || " "
            ? this.old_text_color
            : data.color
      };
      this.commonService.setTheme(themeColor);
      data.value == undefined || null || " "
        ? (this.updated_text_color = this.old_text_color)
        : (this.updated_text_color = data.color);
    }
  }

  /**
   * @Function passwordprofile
   * @desc passwordOnSubmit the password tabs side data
   *
   */
  passwordOnSubmit(passwordData) {
    this.userData["fullname"] = this.userData.fullname;
    this.userData["image"] = this.userProfile.image;
    this.submitted = true;
    if (passwordData.invalid) {
      return;
    }
    this.success = true;
    this.userOldData.isUpdated = this.updatedBasicInfo;
    this.userOldData["dob"] = this.editprofile.controls.dob.value;
    this.userOldData["address_info"] = {
      address_line1: this.editprofile.controls.address_line1.value,
      address_line2: this.editprofile.controls.address_line2.value,
      city: this.editprofile.controls.city.value,
      state: this.editprofile.controls.state.value,
      country: this.editprofile.controls.country.value,
      zip_code: this.zip_code ? null : null
    };
    var updatedData = {
      userImageInfo: this.userProfile,
      userBasicInfo: this.userOldData,
      userPassword: passwordData.value,
      certificateList: this.filesData
    };
    this.finalUploadCertificates();
    updatedData.userPassword["password"] = this.userOldData.password;
    updatedData.userPassword["isUpdated"] = true;
    updatedData["id"] = this.commonService.loggedInUser.id;
    this.sendUpdateData(updatedData,'Change Password');
  }

  /**
   * @Function sendUpdateData (API CALL)
   * @description sending updated data with its current flag
   * @param updatedData
   *
   */
  sendUpdateData(updatedData,callerName) {
    this.commonService
      .apiCall(this.apiListService.editProfile, updatedData)
      .then(async (res: any) => {
        //console.log("res",res)
        if(callerName=='Change Password'){
      const responseFlag = await this.commonService.openAlertDialogForHighAlert(
          'Your password is updated.Please login again with new password.'
        );
        if(responseFlag)
        this.commonService.logout();
      }
      else{
        this.snackbarService.showSuccess(res.status.message);
        this.getCurrentUserData();
        this.updateLocalStorageImageNameLogo();
        this.commonService.setDataInLocalStorageAndObservable(
          "theme",
          this.themeColor
        );
      }
       
      })
      .catch(err => {
      });
  }

  /**
   *
   * @Function onSelectFile
   * @param event
   *
   */
  async onSelectFile(event) {
    this.imageChangedEvent = event;
    try {
      this.userProfileData = await this.commonService.onSelectFile(event);
      this.imageCropData.image = this.userProfileData.image;
      this.userProfile.image_name = this.userProfileData.image_name;
      this.userProfile.isUpdated = true;
    } catch (e) {
      return;
    }
  }

  imageCropped(image) {
    this.imageCropData.image = image.base64;
  }

  /**
   *
   * @Function onSelectFile
   * @param event
   *
   */
  async onSelectorgLogo(event) {
    this.imageChangedEvent1 = event;
    try {
      var orgLogoDeatils: any = await this.commonService.onSelectFile(
        event
      );
      this.org_logo.logo_name = orgLogoDeatils.image_name;
      this.orgCropData.logo_image = orgLogoDeatils.image;
      this.org_logo.isUpdated = true;
      this.org_logo.file_type=orgLogoDeatils.file_type;
    } catch (e) {
      return;
    }
  }

  imageCropped1(image) {
    this.orgCropData.logo_image = image.base64;
  }

  /**
   * @Function getImage cropped
   *
   */
  getImageData() {
    if (this.orgCropData.logo_image || this.imageCropData.image) {
      if (this.org_logo.isUpdated == true) {
        this.org_logo.logo_image = this.orgCropData.logo_image;
      }
      if (this.userProfile.isUpdated == true) {
        this.userProfile.image = this.imageCropData.image;
      }
    } else {
      alert("Sorry there no image is selected for crop");
    }
  }

  /**
   * @Funciton closed image crop modal
   */
  close(type) {
    if (type == "user") {
      this.imageCropData.image = "";
      this.userProfile.image = this.commonService.loggedInUser.image;
      this.userProfile.image_name = this.commonService.loggedInUser.image_name;
      this.userProfile.isUpdated = false;
    } else if ((type = "org")) {
      this.orgCropData.logo_image = "";
    }
  }

  /**
   *
   * @Function onSelectMultipleFiles
   * @param event
   *
   */
  async uploadCertificate(fileUpload) {
    var len = fileUpload.target.files.length;
    if (len > 3) {
      alert("You are only allowed to upload a minimum of 3 files at a time");
    } else {
      for (var i = 0; i < len; i++) {
        if (fileUpload.target.files[i]) {
          try {
            var singleFile: any = await this.commonService.onSelectMultipleFile(
              fileUpload.target.files[i],'Cerificates'
            );
            setTimeout(() => {
              fileUpload.target.value = null;
            }, 5000);
            singleFile.id = null;
            this.filesData.isUpdated = true;
            this.uploadFile.push(singleFile);
          } catch (e) {
            return;
          }
        }
      }
      this.setPdf();
    }
  }

  /**
   * @function setPdf
   * @desc checks file type and santize its image path
   *
   */
  setPdf() {
    for (var i = 0; i < this.uploadFile.length; i++) {
      if (this.uploadFile[i].file_type == "application/pdf") {
        this.uploadFile[
          i
        ].sanitizePdf = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.uploadFile[i].certificate
        );
      }
    }
  }

  /**
   *
   * @function finalUploadCertificates
   * @desc flag set true also assign files
   *
   */
  finalUploadCertificates() {
    this.uploadedFile = true;
    this.filesData.certificates = this.uploadFile;
  }

  /**
   * @function delete
   * @param index
   * @desc delete element from the certificates array also chcek if certificayes already added then push
   * those element into the deletedCertificates array
   *
   */
  delete(index) {
    this.filesData.isUpdated = true;
    if (this.uploadFile[index].id === null) {
    } else {
      this.filesData.deletedCertificates.push(this.uploadFile[index]);
    }
    this.uploadFile.splice(index, 1);
  }

  /**
   * @Function dateFormat
   */
  dateFormat() {
    var date = new Date();
    this.dateofbirth = this.datePipe.transform(
      this.editprofile.controls["dob"].value,
      "yyyy-MM-dd"
    );
  }

  /**
   * @Function emailMatch
   * @param event
   */
  emailMatch(event) {
    if (event.target.value == this.userOldDataCopy) {
      this.emailAvailable = true;
    } else {
      this.emailAvailable = false;
      var email = event.target.value;
    }
  }

  /**
   *
   * @Function showPassword
   *
   */
  showPassword() {
    this.show = true;
  }

  /**
   * @Function checkOldPasswordExists
   * @param event
   */
  checkOldPasswordExists(event) {
    if (event === this.userOldData.password) {
      this.oldPasswordMatchflag = true;
    } else {
      this.oldPasswordMatchflag = false;
    }
    this.passwordValue = event;
  }

  /**
   * @Function flagSetAsUpdated
   * @description On chnage event any input field edited then enters new data then flag becomes true.
   *
   */
  flagSetAsUpdated() {
    this.updatedBasicInfo = true;
  }
  flagSetAsUpdatedFororg() {
    this.orgDataFlag = true;
  }

  /**
   *
   * @param event
   */
  passwordFlag() {
    this.passwordFlagSet = true;
  }

  /**
   * @Function  progressBars
   */
  progresBars() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width * 1 + "%";
      }
    }
  }

  /**
   * @Function Preview
   * @param index
   */
  preview(index) {
    if (this.uploadFile[index].file_type == "application/pdf") {
      this.pdfSource = this.uploadFile[index].sanitizePdf;
    } else {
      this.pdfSourceImage = this.uploadFile[index].certificate;
    }
  }
  /**
   * @Function maxdate
   *
   */
  maxdate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    //To go 18 years back
    this.currentDate = new Date(year - 18, month - 1, day);
  }

  /**
   * @Function deleteImage
   * @param imageName user/org --> image
   *
   */
  async deleteImage(imageName) {
    var status;
    this.getCurrentUserData();
    try {
      const result = await this.commonService.openConfirmationDialog(
        "Are you sure, you want to remove picture?"
      );
      status = this.commonService.deleteImageFlag;
    } catch (error) {}
    if (status == true) {
      var id = this.commonService.loggedInUser.id;
      if (imageName == "user") {
        this.deleteImageApi(id, this.userProfile.image, imageName);
      } else if (imageName == "org") {
        this.deleteImageApi(id, this.org_logo.logo_image, imageName);
      }
    }
  }

  deleteImageApi(id, image_path, imageName) {
    this.commonService
      .apiCall(this.apiListService.removeProfilePicture, {
        id: id,
        image_path: image_path
      })
      .then((res: any) => {
        if (imageName == "user") {
          this.userProfile.image = null;
          this.getCurrentUserData();
          this.updateLocalStorageImageNameLogo();
        } else if (imageName == "org") {
          this.org_logo.logo_image = null;
          this.getCurrentUserData();
          this.themeColor = {
            "--primary-color": this.userOldData.primary_color,
            "--secondary-color": this.userOldData.secondary_color,
            "--button-color": this.userOldData.button_color,
            "org-image": ""
          };
          this.updateLocalStorageImageNameLogo();
          this.commonService.setDataInLocalStorageAndObservable(
            "theme",
            this.themeColor
          );
        }
      })
      .catch(err => {
        console.error("err", err);
      });
  }

  /**
   * @Function getAllState
   * @param countryid
   * @param searchText
   */
  getAllState(countryid, data, callerName,userName) {
    if (callerName == 'state_id') {
      data.state_id = null;
      data.city_id = null;
    }
    else if (callerName == 'org_state_id') {
      data.org_state_id = null
      data.org_city_id = null
    }else if (callerName == 'clinic_state_id'){
      data.clinic_state_id = null
      data.clinic_city_id = null
    }
    if(userName=='User'){
    this.stateList = [];
    this.stateListFororg=[]
    }else{
    this.cityList = [];
    this.cityListFororg = [];
    }
    this.country_id = countryid;
    this.commonService
      .apiCall(this.apiListService.getAllStatesByCountryId, {
        id: this.commonService.loggedInUser.id,
        country_id: this.country_id
      })
      .then((res: any) => {
        if(userName=='User')
        this.stateList = res.result;
        else
        this.stateListFororg = res.result;
        
      })
      .catch(err => { });
  }

  /**
   * @Function getAllCity1
   * @param stateid
   * @param searchText
   */
  getAllCity(stateid, data, callerName,userName) {

    if (callerName == 'city_id')
      data.city_id = null;
    else if (callerName == 'org_city_id')
      data.org_city_id = null
      else if (callerName == 'clinic_city_id')
      data.clinic_city_id = null
    this.state_id = stateid;
    if(userName=='User')
    this.cityList = [];
    else
    this.cityListFororg=[]
    this.commonService
      .apiCall(this.apiListService.getAllCitiesByStateId, {
        id: this.commonService.loggedInUser.id,
        state_id: stateid
      })
      .then((res: any) => {
        
        if(userName=='User')
        this.cityList = res.result;
        else
        this.cityListFororg = res.result;
      })
      .catch(err => { });
  }

  

  getAllData(value,data,callerName) {
    this.city_id = value.city_id;
    if(callerName=='org Admin')
    data.org_zip_code = value.org_zip_code;
    else if(callerName=='EClinic Admin')
    data.clinic_zip_code = value.clinic_zip_code;
    else
   data.zip_code = value.zip_code;
  }

  chekcksOldPasswordValidation() {
    debugger
    let pass = this.passwordUpdateData.controls.password.value;
    let confirmPass = this.passwordUpdateData.controls.new_password.value;
    if(!pass || !confirmPass || pass.trim()=='' || confirmPass.trim()=='')
    return;

    if (confirmPass == pass) {
      this.oldPassFlag = true;
    } else {
      this.oldPassFlag = false;
    }
  }

  getData(country_id) {
    for (var i = 0; i < this.countryList.length; i++)
      if (this.countryList[i].id == country_id)
        return this.countryList[i]
  }

  maskMobileNumber(e) {
    if (e)
      return this.commonService.maskPhone(e)
  }

  maskLandlineNumber(e) {
    if (e)
      return this.commonService.maskLandline(e);
    else
      return;
  }

  viewOtptext(callerName) {
    // var x;
    if(callerName=='New Password'){
      // //console.log("Type",(<HTMLInputElement>document.getElementById("new-password")).type);
       var x = (<HTMLInputElement>document.getElementById("new-password"));
      // //console.log("x",x)
      if (x.type === "password") {
          x.type = "text";
          this.visibilityIconForNew="visibility"
      } else {
          x.type = "password";
          this.visibilityIconForNew="visibility_off"
          
      }
    }else if(callerName=='Old Password'){
      var x = (<HTMLInputElement>document.getElementById("passwordContent"));
      // //console.log("x",x)
      if (x.type === "password") {
          x.type = "text";
          this.visibilityIconForOld="visibility"
      } else {
          x.type = "password";
          this.visibilityIconForOld="visibility_off"
          
      }
     
    }
    else{
      var x = (<HTMLInputElement>document.getElementById("confirm-password"));
      if (x.type === "password") {
          x.type = "text";
          this.visibilityIconForConfirm="visibility"
      } else {
          x.type = "password";
          this.visibilityIconForConfirm="visibility_off"
      }
    }
   
}

}
