import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayersListPage } from './layers-list.page';

const routes: Routes = [
  {
    path: '',
    component: LayersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayersListPageRoutingModule {}
