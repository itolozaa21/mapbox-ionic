import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { LayersListPageModule } from "../layers-list/layers-list.module";

@NgModule({
    declarations: [MapPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MapPageRoutingModule,
        LayersListPageModule
    ]
})
export class MapPageModule {}
