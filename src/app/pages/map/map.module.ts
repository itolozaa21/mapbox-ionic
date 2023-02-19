import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import { LayersListPageModule } from "../layers-list/layers-list.module";
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
@NgModule({
    declarations: [MapPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MapPageRoutingModule,
        LayersListPageModule,
        NgxMapboxGLModule.withConfig({
            accessToken:  environment.MAPBOX_KEY, // Optional, can also be set per map (accessToken input of mgl-map)
        })
    ]
})
export class MapPageModule {}
