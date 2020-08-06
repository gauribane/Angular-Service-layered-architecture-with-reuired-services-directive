import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { UserServiceService } from 'src/app/_services/user-service.service';
import { ApiListService } from 'src/app/_services/api-list.service';
import { GroupByPipe } from 'src/app/pipes/group-by.pipe';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-show-all-notification',
  templateUrl: './show-all-notification.component.html',
  styleUrls: ['./show-all-notification.component.scss']
})
export class ShowAllNotificationComponent implements OnInit {
  panelOpenState = false; // For accordion
  step: any = 0;
  selected_source_info_id: any;
  notification: any = {
    id: "",
    pageNumber: null,
    pageSize: null,
    org_id:""
  }
  particularUser: boolean;
  notificationlist: any;
  selected_notification: any = null;
  navigateUrl:any;
  constructor(public commonService: CommonService,
    public userServiceService: UserServiceService,
    public apiListService: ApiListService,
    public groupByPipe: GroupByPipe,
    public activatedRoute: ActivatedRoute) {
    this.particularUser = false;
  }


  ngOnInit() {
    this.notificationlist = []
    this.activatedRoute.params.subscribe(params => {
      this.selected_source_info_id = params.id;
      if (this.selected_source_info_id) {
        this.notification.patient_id = this.selected_source_info_id;
        this.particularUser = true;
      } else {
        this.particularUser = false;
      }
      this.getUserNotifications();
    });
    this.setUrl();
  }

  setUrl(){
    switch(this.commonService.loggedInUser.role_type){
      case 'Provider':
        this.navigateUrl='/provider/ShowUserProfile';
        break
      case 'org Admin':
        this.navigateUrl='/orgadmin/ShowUserProfile';
        break   
      case 'Super Admin' :
        this.navigateUrl='/superadmin/ShowUserProfile';
        break; 
      default: this.navigateUrl='/e-consult/ShowUserProfile';       
    }
  }

  /**
   *This is common function to get list of notifications 
   */
  getUserNotifications() {
    this.notification.id = this.commonService.loggedInUser.id;
    this.notification.callFrom = "web";
    this.notification.org_id=this.commonService.loggedInUser.role_name=='Cardiologist'?this.commonService.loggedInUser.selected_org_id:null
    this.commonService.apiCall(this.apiListService.getUserNotifications, this.notification)
      .then((res: any) => {
        if (res.status.code == '00')
          this.notificationlist = res.result;
      })
      .catch(err => { });
  }

  /**
   * Set step variable on open on accordion
   * @param index 
   */
  setStep(index: number) {
    this.step = index;
  }

  /**
   * This is common function to open next accordion
   */
  nextStep() {
    this.step++;
  }

  /**
   * This is common function to open previous accordion
   */
  prevStep() {
    this.step--;
  }

  /**
   * This is common function to mark notification as seen & also take action if any
   * @param notification 
   */
  takeAction(notification) {
    this.selected_notification = notification;
    var notification_ids = [];
    this.selected_notification.data.forEach(element => {
      notification_ids.push(element.notification_id);
    });
    if (!this.selected_notification.data[0].is_seen)
      this.commonService.apiCall(this.apiListService.readNotification, { id: this.commonService.loggedInUser.id, notification_ids: notification_ids })
        .then((res: any) => {
          this.getUserNotifications();
        })
        .catch(err => { });
  }

}
