import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerMenuComponent } from './layer-menu.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LayerMenuComponent],
  exports:[LayerMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class LayerMenuModule { }
