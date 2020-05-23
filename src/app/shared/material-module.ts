import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// import {
//      MatSnackBarModule,
//      MatProgressSpinnerModule ,
//      MatCardModule,
//      MatFormFieldModule,
//      MatIconModule,
//      MatTableModule,
//      MatPaginatorModule,
//      MatDialogModule,
//      MatTabsModule,
//      MatSortModule,
//      MatRadioModule,
//      MatSelectModule,
//      MatInputModule,
//      MatMenuModule,
//      MatStepperModule,
//      MatDatepickerModule,
//      MatNativeDateModule,
//      MatButtonToggleModule,
//      MatExpansionModule,
//      MatProgressBarModule,
//      MatAutocompleteModule,
//      MatBadgeModule,
//      MatBottomSheetModule,
//      MatChipsModule,
//      MatDividerModule,
//      MatGridListModule,
//      MatListModule,
//      MatRippleModule,
//      MatSidenavModule,
//      MatSliderModule,
//      MatSlideToggleModule,
//      MatToolbarModule,
//      MatTooltipModule,
//      MatTreeModule,
     

// } from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({

     exports: [
           A11yModule,
           CdkStepperModule,
           CdkTableModule,
           CdkTreeModule,
           PortalModule,
           ScrollingModule,
          // MatAutocompleteModule,
          // MatBadgeModule,
          // MatBottomSheetModule,
          MatButtonModule,
          // MatButtonToggleModule,
          // MatCardModule,
          MatCheckboxModule,
          MatSnackBarModule,
          // MatChipsModule,
          // MatStepperModule,
          // MatDatepickerModule,
          // MatDialogModule,
          // MatDividerModule,
          // MatExpansionModule,
          // MatGridListModule,
          // MatIconModule,
          // MatInputModule,
          // MatListModule,
          // MatMenuModule,
          // MatNativeDateModule,
          // MatPaginatorModule,
          // MatProgressBarModule,
          // MatProgressSpinnerModule,
          // MatRadioModule,
          // MatRippleModule,
          // MatSelectModule,
          // MatSidenavModule,
          // MatSliderModule,
          // MatSlideToggleModule,
          // MatSnackBarModule,
          // MatSortModule,
          // MatTableModule,
          // MatTabsModule,
          // MatToolbarModule,
          // MatTooltipModule,
          // MatTreeModule,
          // MatFormFieldModule
        ]
})
export class MyOwnCustomMaterialModule { }
