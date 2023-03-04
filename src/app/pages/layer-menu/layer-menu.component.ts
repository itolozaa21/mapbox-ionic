import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-layer-menu',
  templateUrl: './layer-menu.component.html',
  styleUrls: ['./layer-menu.component.css'],
})
export class LayerMenuComponent implements OnInit {
  layers = [
    {
      name: 'Pozos',
      id: '3d-model',
      selected: true
    },
    {
      name: 'Fallas',
      id: 'fallas',
      selected: true
    },
    {
      name: 'Conectividades - Alocaciones',
      id: 'fallas',
      selected: true
    },
  ];


  constructor(public mapService: MapService){

  }


  ngOnInit(): void {}
}
