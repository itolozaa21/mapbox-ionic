import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { StackedBarComponent } from './stacked-bar/stacked-bar.component';



@NgModule({
  declarations: [
    BarComponent,
    PieComponent,
    StackedBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BarComponent,
    PieComponent,
    StackedBarComponent
  ]
})
export class ChartsModule { }
