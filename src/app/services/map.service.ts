import { Injectable, NgZone } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { UrlsGlb } from '../models/url-glb';



@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v11';

  camera: THREE.Camera = new THREE.Camera();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer;
  loader = new GLTFLoader;
  directionalLight!: THREE.DirectionalLight;
  directionalLight2!: THREE.DirectionalLight;

  layers: mapboxgl.AnyLayer[] = [];

  
  constructor(private ngZone: NgZone) {
    (mapboxgl as typeof mapboxgl).accessToken = environment.MAPBOX_KEY;
    //this.buildCustomLayers(UrlsGlb.tipo2,[-73.768153 , 6.958787])
    //this.buildCustomLayers(UrlsGlb.tipo2,[-73.766000, 6.961963])

    //this.buildCustomLayers(UrlsGlb.tipo2,[-73.765062, 6.970345])
  }




  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map-box-container',
      style: this.style,
      zoom: 18,
      center: [ -73.768153 , 6.958787],
      pitch: 60,
      antialias: true 
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  buildCustomLayers(url: string , modelOrigin:mapboxgl.LngLatLike  , modelAltitude: number = 0, modelRotate: any = [Math.PI / 2, 0, 0]){

    console.log("modelOrigin",modelOrigin);
    
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin ,
        modelAltitude
    );

    // transformation parameters to position, rotate and scale the 3D model onto the map
    const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: 0,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        /* Since the 3D model is in real world meters, a scale transform needs to be
        * applied since the CustomLayerInterface expects units in MercatorCoordinates.
        */
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    };

    const customLayer: mapboxgl.AnyLayer = {
      id: `3d-model-${this.layers.length++}`,
      type: 'custom',
      renderingMode: '3d',
    
      onAdd: (map: mapboxgl.Map, gl: WebGL2RenderingContext) => {
        console.log("ENTRAAAAA");
        
        const directionalLight = new THREE.DirectionalLight(0xffffff);
              directionalLight.position.set(0, -70, 100).normalize();
              console.log(directionalLight);
              
              this.scene.add(directionalLight);

              const directionalLight2 = new THREE.DirectionalLight(0xffffff);
              directionalLight2.position.set(0, 70, 100).normalize();
              this.scene.add(directionalLight2);

              // use the three.js GLTF loader to add the 3D model to the three.js scene
              const loader = new GLTFLoader();
              loader.load(
                  url,
                  (gltf: GLTF) => {
                      this.scene.add(gltf.scene);
                  }
              );
              this.map = map;

              // use the Mapbox GL JS map canvas for three.js
              this.renderer = new THREE.WebGLRenderer({
                  canvas: map.getCanvas(),
                  context: gl,
                  antialias: true
              });

              this.renderer.autoClear = false;
      },
      render:  (gl: any, matrix: any) => {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
            .makeTranslation(
              modelTransform.translateX,
              modelTransform.translateY,
              modelTransform.translateZ as any
            )
            .scale(
                new THREE.Vector3(
                  modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
        },
      }

      console.log("CUSTOM", customLayer);
      
      this.layers.push(customLayer);
      this.addALayer();
  }

  public addALayer(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('load', () => {
        
        
        this.map.on('load', () => {
          this.layers.forEach((layer) => this.map.addLayer(layer, 'waterway-label'))
        });
      });
    });
  }

  public removeLayer(id: string) {
    this.map.removeLayer(id);
  }

}