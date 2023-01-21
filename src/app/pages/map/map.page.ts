import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { UrlsGlb } from 'src/app/models/url-glb';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  showLayers: boolean = false;

  constructor(private _mapService: MapService) { 
    
  }

  ngOnInit() {
  }

  removeAllLayer(){
    this._mapService.removeLayer();
  }

  repaint(){
    this._mapService.repaint();
  }
}
