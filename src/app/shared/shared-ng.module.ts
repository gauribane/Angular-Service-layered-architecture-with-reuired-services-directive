import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MyOwnCustomMaterialModule } from "./material-module";
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaskInputDirective } from "./../custom-directives/mask-input.directive";
import { AvoidSpaceDirective } from "./../custom-directives/avoid-space.directive";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import {
  BsDatepickerModule,
  DatepickerModule,
} from "ngx-bootstrap/datepicker";

import { AlertDialogComponent } from "./alert-dialog/alert-dialog.component";
import { AlertDialogBoxComponent } from "./alert-dialog-box/alert-dialog-box.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { HighAlertDialogBoxComponent } from "./high-alert-dialog-box/high-alert-dialog-box.component";
import { ConfirmationDialogBoxComponent } from "./confirmation-dialog-box/confirmation-dialog-box.component";

//Pipes
import { GetKeysPipe } from "./../pipes/get-keys.pipe";
import { AgePipe } from "../pipes/age-pipe";
import { GetFilteredDataPipe } from "./../pipes/get-filtered-data.pipe";
import { DateFormatPipe } from "./../pipes/date-format.pipe";
import { DateFormatApiPipe } from "./../pipes/date-format-api.pipe";
//Services
import { ApiService } from "./../_services/api.service";
import { CommonService } from "./../_services/common.service";
import { ConnectionStatusService } from "./../_services/connection-status.service";
import { LoaderService } from "./../_services/loader.service";
import { LocalDataService } from "./../_services/local-data.service";
import { SnackbarService } from "./../_services/snackbar.service";
import {CryptoService} from "./../_services/crypto.service";
import { RouterModule } from "@angular/router";
import { ErrorComponent } from "./shared-component/error/error.component";
import { EditProfileComponent } from "./shared-component/edit-profile/edit-profile.component";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "../_services/loader.interceptor";
import { LoaderComponent } from "./shared-component/loader/loader.component";
import { ShowUserProfileComponent } from "./shared-component/show-user-profile/show-user-profile.component";
// import { DeviceDetectorModule } from "ngx-device-detector";
import { ShowAllNotificationComponent } from "./shared-component/show-all-notification/show-all-notification.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { HighchartsChartModule } from 'highcharts-angular';

import { DisabledcontrolDirective } from '../custom-directives/disabledcontrol.directive';
import {AvoidCharacterDirective} from '../custom-directives/avoid-character.directive';
import {GroupByPipe} from './../pipes/group-by.pipe';
import {NotificationAgoPipe} from './../pipes/notification-ago.pipe';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MultipleMatSelectSearchComponent } from './shared-component/multiple-mat-select-search/multiple-mat-select-search.component';
import { SingleMatSelectSearchCommonComponent } from './shared-component/single-mat-select-search-common/single-mat-select-search-common.component';
import { SingleMatSelectSearchWithoutValidationComponent } from './shared-component/single-mat-select-search-without-validation/single-mat-select-search-without-validation.component';
import { MultipleMatSelectSearchWithoutValidationComponent } from './shared-component/multiple-mat-select-search-without-validation/multiple-mat-select-search-without-validation.component';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    HighAlertDialogBoxComponent,
    AlertDialogComponent,
    AlertDialogBoxComponent,
    ConfirmationDialogBoxComponent,
    GetKeysPipe,
    GetFilteredDataPipe,
    MaskInputDirective,
    AvoidSpaceDirective,
    // ControlErrorDirective,
    ErrorComponent,
    EditProfileComponent,
    // AddProviderComponent,
    AgePipe,
    DateFormatPipe,
    GroupByPipe,
    NotificationAgoPipe,
    DateFormatApiPipe,
    LoaderComponent,
    ShowUserProfileComponent,
   
    ShowAllNotificationComponent,
    HighAlertDialogBoxComponent,
   
    DisabledcontrolDirective,
    AvoidCharacterDirective,
   
    MultipleMatSelectSearchComponent,
    SingleMatSelectSearchCommonComponent,
    SingleMatSelectSearchWithoutValidationComponent,
    MultipleMatSelectSearchWithoutValidationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    MyOwnCustomMaterialModule,
   
    // NgbModule,
    RouterModule,
    DatepickerModule,
    BsDatepickerModule,
    // DeviceDetectorModule.forRoot(),
    MatAutocompleteModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    HighchartsChartModule,
    MatAutocompleteModule,
    MyOwnCustomMaterialModule,
    CommonModule,
    // NgbModule,
  
    RouterModule,
    DatepickerModule,
    BsDatepickerModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxMatSelectSearchModule,
    AgePipe,
    DateFormatPipe,
    DateFormatApiPipe,
    GroupByPipe,
    NotificationAgoPipe,
    GetKeysPipe,
    GetFilteredDataPipe,
    DisabledcontrolDirective,
    AvoidCharacterDirective,
    AvoidSpaceDirective,
    MultipleMatSelectSearchComponent,
    SingleMatSelectSearchCommonComponent,
    SingleMatSelectSearchWithoutValidationComponent,
    MultipleMatSelectSearchWithoutValidationComponent
  ],
  providers: [
    HttpClientModule,
    { provide: HighchartsChartModule, useFactory: () => [NoDataToDisplay] },
    DatePipe,
    LoaderService,
    ApiService,
    CommonService,
    SnackbarService,
    CryptoService,
    LocalDataService,
    ConnectionStatusService,
    GetKeysPipe,
    GetFilteredDataPipe,
    DateFormatPipe,
    DateFormatApiPipe,
    GroupByPipe,
    NotificationAgoPipe,
    AgePipe
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    HighAlertDialogBoxComponent,
    AlertDialogComponent,
    AlertDialogBoxComponent,
    ConfirmationDialogBoxComponent
  ]
})
export class SharedNgModule {}
