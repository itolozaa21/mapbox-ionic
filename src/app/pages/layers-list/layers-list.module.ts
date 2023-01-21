import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayersListPageRoutingModule } from './layers-list-routing.module';

import { LayersListPage } from './layers-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayersListPageRoutingModule
  ],
  exports:[
    LayersListPage
  ],
  declarations: [LayersListPage]
})
export class LayersListPageModule {}
