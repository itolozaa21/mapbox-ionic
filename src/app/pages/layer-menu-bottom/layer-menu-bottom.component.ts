import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-layer-menu-bottom',
  templateUrl: './layer-menu-bottom.component.html',
  styleUrls: ['./layer-menu-bottom.component.css']
})
export class LayerMenuBottomComponent implements OnInit{

  public mapTypes = [
    {name  : 'Principal' , value:'outdoors-v11'},
    {name  : 'Satelital' , value:'satellite-v9' },
    //{name  : 'Topográfico' , value:'streets-v11'},
    {name  : 'Oscuro' , value:'dark-v11'}
  ]

  constructor(public mapService: MapService){
    
  }

  ngOnInit(): void {
    
  }

  switchLayer(layer:string){
    this.mapService.switchLayer(layer)
  }
  
}
