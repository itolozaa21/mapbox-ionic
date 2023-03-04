import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-layers-list',
  templateUrl: './layers-list.page.html',
  styleUrls: ['./layers-list.page.scss'],
})
export class LayersListPage implements OnInit {


  constructor(private _mapService: MapService) { }

  ngOnInit() {
  }

  get layersList(){
    return this._mapService.layers
  }

  removeLayer(id: string){
    this._mapService.removeLayer(id);
  }
}
