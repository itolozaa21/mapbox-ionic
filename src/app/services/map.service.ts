'use strict';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { UrlsGlb } from '../models/url-glb';
import * as Threebox from 'threebox-plugin/src/Threebox';
import AnimatedPopup from 'mapbox-gl-animated-popup';
import { animate } from '@angular/animations';
interface ILayer {
  id: string;
}
@Injectable({
  providedIn: 'root',
})
export class MapService {
  public layers: string[] = [];

  private map!: mapboxgl.Map;
  
  private style = 'mapbox://styles/mapbox/dark-v11';
  private urls = [UrlsGlb.tipo2];

  tb: any;
  origin: number[] = [-73.768153, 6.958787];
  popup!: mapboxgl.Popup;

  constructor(private ngZone: NgZone, private http: HttpClient) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_KEY;
    window.addEventListener('load', () => {
      this.buildMap();
      this.map.on('load', () => {
        this.animate()
        this.repaint();
       
        //let layersIds = this.layers.map((layer) => layer.id);
        setTimeout(() => {
          this.map.on('click',(e: any) => {
            console.log(e);
            
            //console.log(e..);
            
          });
        }, 1000);
        
        
      });
    });
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map-box-container',
      style: this.style,
      zoom: 15,
      center: this.origin as mapboxgl.LngLatLike,
      pitch: 68,
      antialias: true,
    });

    this.tb = new Threebox(this.map, this.map.getCanvas().getContext('webgl'), {
      defaultLights: true,
      enableSelectingObjects: true, //change this to false to disable 3D objects selection
      enableDraggingObjects: true, //change this to false to disable 3D objects drag & move once selected
      enableRotatingObjects: true, //change this to false to disable 3D objects rotation once selected
      enableTooltips: true, // change this to false to disable default tooltips on fill-extrusion and 3D models
      enableHelpTooltips: true, // remove this to disable default help tooltips for draggin, rotating and measure
    });
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    //let popup = new  mapboxgl.Popup({closeButton: false}).setHTML(`<h6>HOLA</h6>`).setLngLat(this.origin as mapboxgl.LngLatLike).addTo(this.map);
    // new mapboxgl.Marker({
    //   color: 'red',
    //   draggable: true
    // }).setLngLat(this.origin as mapboxgl.LngLatLike)
    // .setPopup(popup)
    // .addTo(this.map).togglePopup();

    setTimeout(() => {
      this.map.resize();
    }, 100);
  }

  addModel(layerId: string, origin: number[], url: string) {
    let options = {
      type: 'gltf',
      obj: url, //model url
      units: 'meters', //units in the default values are always in meters
      scale: 1,
      //rotation: { x: 65, y: 220, z: 0 },
      rotation: { x: 90, y: 120, z: 0 }, //default  rotation
      anchor: 'center',
      clone: false,
    };
    this.tb.loadObj(options, (model: any) => {
      model.setCoords(origin);
      //model.addEventListener('ObjectMouseOver', this.onObjectMouseOver, false);
      model.addTooltip('This is a custom tooltip', false);
      //model.set({ rotation: { x: 0, y: 0, z: 11520 }, duration: 20000 });
      model.castShadow = true;
      this.tb.add(model, layerId);
    });
    
    this.layers.push(layerId);
  }

  //actions to execute onObjectMouseOverVas
  onObjectMouseOver(e) {
    console.log('ObjectMouseOver: ', e);
  }

  public removeLayer(id?: string, layerId: string = '3d-model') {
    if (id) {
      this.tb.clear(id);
      this.layers = this.layers.filter((layer) => layer != id);
    } else {
      this.map.removeLayer(layerId);
      this.layers.forEach((layer) => {
        this.tb.clear(id);
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

  public repaint() {
    const layer: mapboxgl.CustomLayerInterface = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: (map, mbxContext) => {
        this.getCordinates().subscribe((response) => {
          response.forEach((origin, index) => {
            const url = this.urls[Math.floor(Math.random() * this.urls.length)];
            this.addModel(`3d-model-${index}`, [origin.lng, origin.lat], url);
          });
        });
      },
      render: (gl, matrix) => {
        this.tb.update();
      },
    };
    this.map.addLayer(layer);
  }

  animate = function () {
    console.log('s');
    
    requestAnimationFrame(animate);
    //stats.update();
  }
}
