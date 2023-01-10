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

  constructor(private _mapService: MapService) { 
  }

  ngOnInit() {
    this.addLayer();
  }

  ionViewWillEnter(){
    this._mapService.buildMap();
  } 

  removeLayer(){
    this._mapService.removeLayer('3d-model-0');
  }

  addLayer(){
    this._mapService.buildCustomLayers(UrlsGlb.tipo2,[-73.768153 , 6.958787])
    //this._mapService.buildCustomLayers(UrlsGlb.tipo2,[-73.768153 , 6.958787])
    //this._mapService.addALayer();
  }
}
