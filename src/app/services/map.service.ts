"use strict";
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { UrlsGlb } from '../models/url-glb';
//declare var Threebox: any
import * as Threebox  from 'threebox-plugin/src/Threebox'; 

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public layers: mapboxgl.AnyLayer[] = [];

  private map!: mapboxgl.Map;
  private style = 'mapbox://styles/mapbox/dark-v11';
  private urls = [UrlsGlb.tipo2];
  
  tb: any;

  constructor(private ngZone: NgZone, private http: HttpClient) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_KEY;
    window.addEventListener('load', () => {
      this.buildMap();
      this.map.on('load', () => {
        // this.getCordinates().subscribe((response) => {
        //   response.forEach((origin, index) => {
        //     //console.log(element);
        //     const url = this.urls[Math.floor(Math.random() * this.urls.length)];
        //     let layerId = `3d-model-${index}`;
        //     const layer = this.buildCustomLayers([origin.lng, origin.lat], layerId, url);
        //     this.map.addLayer(layer, 'waterway-label');
        //   });
        // });
      });

      this.map.on('click', (e) => {
        const layer = this.buildCustomLayers([e.lngLat.lng, e.lngLat.lat]);
        this.map.addLayer(layer, 'waterway-label');
      });
    });
  }

  buildMap() {
  
    this.map = new mapboxgl.Map({
      container: 'map-box-container',
      style: this.style,
      zoom: 15,
      center: [-73.768153, 6.958787],
      pitch: 68,
      antialias: true,
    });

    this.tb = new Threebox(this.map, this.map.getCanvas().getContext('webgl'), {
      defaultLights: true,
      enableSelectingObjects: true,
      enableTooltips: false,
      multiLayer: false, // this will create a default custom layer that will manage a single tb.update
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  buildCustomLayers(
    modelOrigin: number[],
    url: string = UrlsGlb.tipo2,
  ) {
    let layerId = `3d-model-${this.layers.length}`;
    console.log(layerId);
    
    const customLayer: mapboxgl.AnyLayer = {
      id: layerId,
      type: 'custom',
      renderingMode: '3d',
      onAdd: (map: mapboxgl.Map, gl: WebGL2RenderingContext) => {
        this.addModel(layerId,modelOrigin,url);
      },
      render: (gl: WebGL2RenderingContext, matrix: number[]) => {
        this.tb.update();
      },
    };
    this.layers.push(customLayer);
    return customLayer;
  }

  addModel(layerId:string, origin: number[], url:string) {
    let options = {
      type: 'gltf',
      obj: url, //model url
      units: 'meters', //units in the default values are always in meters
      scale: 1,
      rotation: { x: 90, y: 180, z: 0 }, //default rotation
      anchor: 'center',
    };
    this.tb.loadObj(options,(model: any) => {
      model.setCoords(origin);
      this.tb.add(model, layerId);
    }); 
  }

  public removeLayer(id?: string) {
    if (id) {
      this.map.removeLayer(id);
      this.tb.clear(id)
      this.layers = this.layers.filter((layer) => layer.id != id);
    } else {
      this.layers.forEach((layer) => { 
        this.map.removeLayer(layer.id);
        this.tb.clear(id)
      });
      this.layers = [];
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * 100) + 100;
  }

  public getCordinates() {
    return this.http.get<mapboxgl.LngLat[]>('assets/coordenadas.json');
  }
}
