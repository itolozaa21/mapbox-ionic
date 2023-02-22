import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

const StatsBarChart: any = [
  {company: 'Apple', frequency: 100000},
  {company: 'IBM', frequency: 80000},
  {company: 'HP', frequency: 20000},
  {company: 'Facebook', frequency: 70000},
  {company: 'TCS', frequency: 12000},
  {company: 'Google', frequency: 110000},
  {company: 'Wipro', frequency: 5000},
  {company: 'EMC', frequency: 4000}
];

const stackedChart: any[] = [
  {
    "Less30":2175,
    "Gt30Le60":1329,
    "Gt60le90":605,
    "Gt90":866,
    "date":"2010"
  },
  {
    "Less30":1804,
    "Gt30Le60":1332,
    "Gt60le90":859,
    "Gt90":855,
    "date":"2011"
  },
  {
    "Less30":2148,
    "Gt30Le60":993,
    "Gt60le90":614,
    "Gt90":848,
    "date":"2012"
  }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  data = StatsBarChart;
  data2= stackedChart;
  
  constructor() {
    
  }

  ngOnInit() {
   
  }
}
