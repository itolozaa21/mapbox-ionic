'use strict';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { UrlsGlb } from '../models/url-glb';
import * as Threebox from 'threebox-plugin/src/Threebox';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MapService {

  private tb: any;
  private urls = [UrlsGlb.tipo2];
  private popup!: mapboxgl.Popup;

  public layers: string[] = [];
  public style = 'mapbox://styles/mapbox/dark-v11';
  public map!: mapboxgl.Map;
  public coordenadas: mapboxgl.LngLat[] = [];
  public origin: number[] = [-73.768153, 6.958787];
  
  public sourceCluster:any = {
    type: 'geojson',
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50,
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  };

  public clusterlayer: any = {
    id: 'clusters',
    type: 'circle',
    source: 'sourceCluster',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
        '#f28cb1',
      ],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    },
  };

  public clusterCount = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'sourceCluster',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  };

  constructor(private ngZone: NgZone, private http: HttpClient) {
    window.addEventListener('load', () => {
      this.coordenadas.forEach((origin, index) => {
        this.sourceCluster.data.features.push({
          type: 'Feature',
          properties: {
            id: 'ak16994521',
            mag: 2.3,
            time: 1507425650893,
            felt: null,
            tsunami: 0,
          },
          geometry: {
            type: 'Point',
            coordinates: [origin.lng, origin.lat],
          },
        });
      });
    });
  }

  public buildMap() {
    this.tb = new Threebox(this.map, this.map.getCanvas().getContext('webgl'), {
      defaultLights: true,
      enableSelectingObjects: true, //change this to false to disable 3D objects selection
      enableDraggingObjects: true, //change this to false to disable 3D objects drag & move once selected
      enableRotatingObjects: true, //change this to false to disable 3D objects rotation once selected
      enableTooltips: true, // change this to false to disable default tooltips on fill-extrusion and 3D models
      enableHelpTooltips: true, // remove this to disable default help tooltips for draggin, rotating and measure
    });
    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    this.repaint()
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
    return Math.floor(Math.random() * 10) + 10;
  }

  public getCordinates() {
    return this.http.get<mapboxgl.LngLat[]>('assets/coordenadas.json');
  }

  public save(user): Observable<any> {
    const url = 'assets/coordenadas3.json';
    return this.http.post<any>(url, user);
  }

  public repaint() {
    const layer: mapboxgl.CustomLayerInterface = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: (map, mbxContext) => {
        this.coordenadas.forEach((origin, index) => {
          const url = this.urls[Math.floor(Math.random() * this.urls.length)];
          this.addModel(`3d-model-${index}`, [origin.lng, origin.lat], url);
        });
      },
      render: (gl, matrix) => {
        this.tb.update();
      },
    };
    this.map.addLayer(layer);
  }
}
