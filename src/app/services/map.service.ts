'use strict';
import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, NgZone, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { UrlsGlb } from '../models/url-glb';
import * as Threebox from 'threebox-plugin/src/Threebox';
import { Observable } from 'rxjs';
import * as test from '../../assets/geojson.json';
import { environment } from 'src/environments/environment';
import * as THREE from 'three';
import * as cssw from 'three-css2drender';
import { LabelCustomComponent } from '../pages/map/label-custom/label-custom.component';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  @ViewChild(LabelCustomComponent) labelComponent!: LabelCustomComponent;
  private tb: any;
  private urls = [UrlsGlb.tipo2];

  public layers: string[] = [];
  public layerId = 'dark-v11';
  public style = 'mapbox://styles/mapbox/dark-v11';
  public map!: mapboxgl.Map;
  public coordenadas: mapboxgl.LngLat[] = [];
  public origin: number[] = [-73.768153, 6.958787];

  public sourceCluster: any = {
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

  geojson: any = {
    type: 'FeatureCollection',
    features: [],
  };

  constructor(private ngZone: NgZone, private http: HttpClient) {
    window.addEventListener('load', () => {
      this.coordenadas.forEach((origin, index) => {
        this.sourceCluster.data.features.push({
          type: 'Feature',
          properties: {
            id: 'ak16994521',
          },
          geometry: {
            type: 'Point',
            coordinates: [origin.lng, origin.lat],
          },
        });
      });
    });
  }

  public async buildMap(repaint: boolean = false) {
    this.tb = new Threebox(this.map, this.map.getCanvas().getContext('webgl'), {
      defaultLights: true,
      enableSelectingObjects: true, //change this to false to disable 3D objects selection
      enableDraggingObjects: true, //change this to false to disable 3D objects drag & move once selected
      enableRotatingObjects: true, //change this to false to disable 3D objects rotation once selected
      enableTooltips: true, // change this to false to disable default tooltips on fill-extrusion and 3D models
      enableHelpTooltips: true, // remove this to disable default help tooltips for draggin, rotating and measure
    });

    var data: any = test;
    //console.log(await this.getLines());
    this.map.addSource('Fallas', {
      type: 'geojson',
      data,
    });

    this.map.addLayer({
      id: 'fallas',
      type: 'line',
      source: 'Fallas',
      paint: {
        'line-color': ['get', 'color'],
        'line-width': 6,
      },
    });

    this.map.addLayer({
      id: 'metro-highlighted',
      type: 'line',
      source: 'Fallas',
      paint: {
        'line-color': ['get', 'color'],
        'line-width': 10,
      },
      filter: ['in', 'OGC_FID', ''],
    });

    this.map.on('mousemove', 'fallas', (e: any) => {
      if (e.features.length > 0) {
        var feature = e.features[0];
        this.map.setFilter('metro-highlighted', [
          'in',
          'OGC_FID',
          feature.properties.OGC_FID,
        ]);
      }
    });

    this.map.on('mouseleave', 'fallas', () => {
      this.map.setFilter('metro-highlighted', ['in', 'OGC_FID', '']);
    });

    this.map.on('zoomend', (e) => {
      if (this.map.getZoom() <= 14) {
        this.tb.world.children.forEach((element) => {
          element.children[0].children.forEach((children) => {
            if (children.type == 'Object3D') {
              children.visible = false;
            }
          });
        });
      } else {
        this.tb.world.children.forEach((element) => {
          element.children[0].children.forEach((children) => {
            if (children.type == 'Object3D') {
              children.visible = true;
            }
          });
        });
      }
    });
    this.repaint();
  }

  changeTextButton(event) {
    console.log('ASS', event);
  }

  showLabels() {
    this.tb.world.children.forEach((element) => {
      element.children[0].children.forEach((children) => {
        if (children.type == 'Object3D') {
          children.visible = !children.visible;
        }
      });
    });
    this.map.triggerRepaint();
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
      // model.addTooltip('This is a custom tooltip', true);
      // model.addTooltip('TEST', false);
      //model.set({ rotation: { x: 0, y: 0, z: 11520 }, duration: 20000 });
      model.castShadow = true;

      const labels = [
        { name: 'P2GRSSFS-1', position: { x: 100, y: 0, z: 0 } },
        { name: 'LA2542424-2', position: { x: 0, y: 0, z: 200 } },
        { name: 'LA2542424', position: { x: 0, y: 100, z: 0 } },
      ];

      labels.forEach((data, index) => {
        const label = this.drawLabelHTML(
          model,
          this.getHTML(data.name, index),
          model.anchor,
          index.toString()
        );
        const { x, y, z } = data.position;
        label.position.set(x, y, z);
      });
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
      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId);
        this.layers.forEach((layer) => {
          this.tb.clear(layer);
        });
        this.layers = [];
      }
    }
  }

  public setVisibilityLayer(show: boolean, layerId: string = '3d-model') {
    show
      ? this.map.setLayoutProperty(layerId, 'visibility', 'visible')
      : this.map.setLayoutProperty(layerId, 'visibility', 'none');
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * 10) + 10;
  }

  public getCordinates() {
    return this.http.get<mapboxgl.LngLat[]>('assets/coordenadas.json');
  }

  public async getLines() {
    return await this.http
      .get<mapboxgl.LngLat[]>(
        'https://api.staging.taskgo.com.co/serverless/ecopetrol/get-data/?layer=conectividades&column=vol_adj&cluster_name=true&intercept_on=false&lambda=5535156.25&fecha_desde=31-12-2005&fecha_hasta=1-3-2023'
      )
      .toPromise();
  }

  public save(user): Observable<any> {
    const url = 'assets/coordenadas3.json';
    return this.http.post<any>(url, user);
  }

  public repaint() {
    this.removeLayer();
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

  public async switchLayer(layer: string) {
    if (this.layerId != layer) {
      this.layerId = layer;
      this.switchBaseMap(this.map, layer);
      setTimeout(() => {
        this.repaint();
      }, 500);
    }
  }

  async switchBaseMap(map, styleID) {
    const response = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/${styleID}?access_token=pk.eyJ1IjoiaXRvbG96YWEyMSIsImEiOiJjbGNoMG1yZ2k4ZXB2M29wbGRta2l6dzVkIn0.0M_onIdklkiLkiMnmWEgGw`
    );
    const newStyle = await response.json();

    const currentStyle = map.getStyle();
    // ensure any sources from the current style are copied across to the new style
    newStyle.sources = Object.assign(
      {},
      currentStyle.sources,
      newStyle.sources
    );

    // find the index of where to insert our layers to retain in the new style
    let labelIndex = newStyle.layers.findIndex((el) => {
      return el.id == 'waterway-label';
    });

    // default to on top
    if (labelIndex === -1) {
      labelIndex = newStyle.layers.length;
    }
    const appLayers = currentStyle.layers.filter((el) => {
      // app layers are the layers to retain, and these are any layers which have a different source set
      return (
        el.source &&
        el.source != 'mapbox://mapbox.satellite' &&
        el.source != 'mapbox' &&
        el.source != 'composite'
      );
    });
    newStyle.layers = [
      ...newStyle.layers.slice(0, labelIndex),
      ...appLayers,
      ...newStyle.layers.slice(labelIndex, -1),
    ];
    map.setStyle(newStyle);
  }

  onSelectedFeatureChange(ev: any): void {
    console.log('TEST');
  }

  getHTML(text: string, index: number) {
    return `<div >
      <span  style="display: flex;flex-direction: row;align-content: center;"> 
      
        <span  class="texto-visible-${index}">${text}</span>
      </span>
    </div>`;
  }

  drawLabelHTML(
    obj,
    HTMLElement,
    center,
    labelName = 'label',
    cssClass = 'custom-text',
    visible = true,
    height = 0.5
  ) {
    let divLabel = this.drawLabelHTMLGenerate(HTMLElement, cssClass);
    let label = obj.addCSS2D(divLabel, labelName, center, height); //label.position.set(((-size.x * 0.5) - obj.model.position.x - center.x + bottomLeft.x), ((-size.y * 0.5) - obj.model.position.y - center.y + bottomLeft.y), size.z * 0.5); //middle-centered
    label.alwaysVisible = visible;
    label.visible = visible;
    return label;
  }

  drawLabelHTMLGenerate(HTMLElement, cssClass: string) {
    let div = document.createElement('div');
    div.setAttribute('style', 'color:white');
    div.className += cssClass;

    // [jscastro] create a div [TODO] analize if must be moved
    if (typeof HTMLElement == 'string') {
      div.innerHTML = HTMLElement;
    } else {
      div.innerHTML = HTMLElement.outerHTML;
    }

    div.addEventListener('mouseover', (e) => {
      console.log("E", e);
      console.log();
      const texto = document.querySelector('.texto-visible-1')
      texto?.setAttribute('style', 'display:block')
    })
    return div;
  }
}
