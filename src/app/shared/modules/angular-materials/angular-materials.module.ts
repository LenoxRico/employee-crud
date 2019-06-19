import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatDialogModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatPaginatorModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

const modules =[
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  OverlayModule,
  MatTableModule,
  MatCardModule,
  MatDialogModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatPaginatorModule
]
@NgModule({
  imports: modules,
  exports: modules
})
export class AngularMaterialsModule { }