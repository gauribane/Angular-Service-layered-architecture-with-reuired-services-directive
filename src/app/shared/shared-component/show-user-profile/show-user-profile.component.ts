import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../_services/common.service';
import { ApiListService } from '../../../_services/api-list.service';

@Component({
  selector: 'app-show-user-profile',
  templateUrl: './show-user-profile.component.html',
  styleUrls: ['./show-user-profile.component.scss']
})
export class ShowUserProfileComponent implements OnInit {

  provider_Id: any;
  userDetails:any;
  userProfile:any={};
  // LoggedInUser:any;
  certificatesList:any;
  pdfSourceImage:any;
  pdfSource:any;
  skillsList:any;
  


  /**
   * @constructor
   * @param route 
   * @param commonService 
   * @param apiListService 
   */
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private apiListService: ApiListService
  ) { 
    
  }

  /**
   * @ngOnInit
   * 
   */
  ngOnInit() {
    // this.LoggedInUser = JSON.parse(localStorage.getItem('userOfOrg'));
    this.route.params.subscribe(params => {
      this.provider_Id = params.id;
      // //console.log("Params...", params.id);
    });
   
    this.getUserData();
    this.skillsList = [
      {
        'skill_name':'skill 1',
      },
      {
        'skill_name':'skill 1',
      },
      {
        'skill_name':'skill 1',
      }
    ]
  }

  /**
   * @Function getProviderIdFromRoutelink
   * @Description get provider id as agrgument 
   * 
   */
  getProviderIdFromRouterlink() {
  
  }


  getUserData() {
    this.commonService.apiCall(this.apiListService.getUserDataById, { id: this.commonService.loggedInUser.id, user_id : this.provider_Id }).then((res: any) => {
      // //console.log('GET USER PROFILE DATA', res.result);
      this.userDetails = res.result;
       this.userProfile.image = this.userDetails.image_path;
       this.certificatesList = this.userDetails.certificateList;
      //  //console.log('certificates', this.certificatesList);
    }).catch(err => {
      // //console.log('err', err);
    });
  
  }

  preview(index){
      this.pdfSourceImage = this.certificatesList[index].certificate;
  }

  // maskMobileNumber(e){
  //   //debugger;
  //   if(e)
  //   return this.commonService.maskPhone(e)
  // }

  // maskLandlineNumber(e){
  //   if(e)
  //   return this.commonService.maskLandline(e);
  //   else
  //   return;
  // }

}
