import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerMenuBottomComponent } from './layer-menu-bottom.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LayerMenuBottomComponent],
  exports:[LayerMenuBottomComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class LayerMenuBottomModule { }
