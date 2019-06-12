import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/modules';
import { MainComponent } from '../components';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent],
  entryComponents: [MainComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  providers: []
})
export class MainModule {}
