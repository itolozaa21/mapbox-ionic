import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayersListPageModule } from '../layers-list/layers-list.module';

import { MapPage } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class MapPageRoutingModule {}
