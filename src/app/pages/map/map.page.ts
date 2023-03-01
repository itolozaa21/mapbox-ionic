import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  showLayers: boolean = false;
  
  constructor(public _mapService: MapService) {
    this._mapService.getCordinates().subscribe((coords) => {
      _mapService.coordenadas = coords;
    });
  }

  ngOnInit() {}

  removeAllLayer() {
    this._mapService.removeLayer();
  }

   repaint(){
     this._mapService.repaint();
  }

  onMapLoad(map) {
    this._mapService.map = map;
    console.log(map);
    
    this._mapService.map.resize();
    this._mapService.buildMap ();
  }
}
