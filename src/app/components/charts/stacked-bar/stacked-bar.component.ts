import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

const data1 = [
  {
    group: 'Andrew',
    cat_a: 9577,
    cat_b: 942,
    cat_c: 471,
    cat_d: 2355,
    cat_e: 632,
    cat_f: 324,
    cat_g: 123,
    cat_h: 2355,
    cat_apct: 57.07729900470827,
    cat_bpct: 5.614160557840157,
    cat_cpct: 2.8070802789200786,
    cat_dpct: 14.035401394600393,
    cat_epct: 3.7666130281899997,
    cat_fpct: 1.9309851600214554,
    cat_gpct: 0.7330591811192562,
    cat_hpct: 14.035401394600393,
  },
  {
    group: 'Matthew',
    cat_a: 10362,
    cat_b: 1256,
    cat_c: 157,
    cat_d: 314,
    cat_e: 754,
    cat_f: 217,
    cat_g: 235,
    cat_h: 3611,
    cat_apct: 61.291849047675385,
    cat_bpct: 7.4293150360818645,
    cat_cpct: 0.9286643795102331,
    cat_dpct: 1.8573287590204661,
    cat_epct: 4.459955045545961,
    cat_fpct: 1.2835679640364368,
    cat_gpct: 1.3900390393942978,
    cat_hpct: 21.35928072873536,
  },
  {
    group: 'Mark',
    cat_a: 9420,
    cat_b: 157,
    cat_c: 2669,
    cat_d: 1099,
    cat_e: 274,
    cat_f: 364,
    cat_g: 123,
    cat_h: 2355,
    cat_apct: 57.22617094951704,
    cat_bpct: 0.953769515825284,
    cat_cpct: 16.21408176902983,
    cat_dpct: 6.676386610776988,
    cat_epct: 1.6645404288925338,
    cat_fpct: 2.211287285098111,
    cat_gpct: 0.747220703480955,
    cat_hpct: 14.30654273737926,
  },
  {
    group: 'Luke',
    cat_a: 9106,
    cat_b: 314,
    cat_c: 2512,
    cat_d: 471,
    cat_e: 123,
    cat_f: 127,
    cat_g: 234,
    cat_h: 3297,
    cat_apct: 56.26544735541275,
    cat_bpct: 1.940187839841819,
    cat_cpct: 15.521502718734553,
    cat_dpct: 2.9102817597627286,
    cat_epct: 0.7600098863074641,
    cat_fpct: 0.7847256549678695,
    cat_gpct: 1.4458724666337124,
    cat_hpct: 20.3719723183391,
  },
  {
    group: 'John',
    cat_a: 7693,
    cat_b: 157,
    cat_c: 3768,
    cat_d: 942,
    cat_e: 964,
    cat_f: 876,
    cat_g: 234,
    cat_h: 3140,
    cat_apct: 43.282322493529875,
    cat_bpct: 0.8833127039495893,
    cat_cpct: 21.19950489479014,
    cat_dpct: 5.299876223697535,
    cat_epct: 5.42365252616181,
    cat_fpct: 4.928547316304715,
    cat_gpct: 1.3165297625745471,
    cat_hpct: 17.666254078991788,
  },
  {
    group: 'Jimmy',
    cat_a: 6594,
    cat_b: 785,
    cat_c: 3611,
    cat_d: 1099,
    cat_e: 227,
    cat_f: 164,
    cat_g: 264,
    cat_h: 3611,
    cat_apct: 40.317945582390706,
    cat_bpct: 4.799755426475085,
    cat_cpct: 22.078874961785385,
    cat_dpct: 6.719657597065118,
    cat_epct: 1.3879547538978905,
    cat_fpct: 1.0027514521553043,
    cat_gpct: 1.6141852644451238,
    cat_hpct: 22.078874961785385,
  },
  {
    group: 'Bill',
    cat_a: 6437,
    cat_b: 3297,
    cat_c: 1256,
    cat_d: 471,
    cat_e: 532,
    cat_f: 653,
    cat_g: 278,
    cat_h: 4239,
    cat_apct: 37.5050981763095,
    cat_bpct: 19.20992833420731,
    cat_cpct: 7.318067936840879,
    cat_dpct: 2.7442754763153294,
    cat_epct: 3.099691196177824,
    cat_fpct: 3.8046961486919537,
    cat_gpct: 1.619763444619239,
    cat_hpct: 24.698479286837966,
  },
  {
    group: 'Bob',
    cat_a: 5495,
    cat_b: 2512,
    cat_c: 2983,
    cat_d: 942,
    cat_e: 346,
    cat_f: 164,
    cat_g: 274,
    cat_h: 3768,
    cat_apct: 33.335355496238776,
    cat_bpct: 15.23901965542344,
    cat_cpct: 18.096335840815335,
    cat_dpct: 5.71463237078379,
    cat_epct: 2.0990050958505218,
    cat_fpct: 0.994904149478282,
    cat_gpct: 1.6622179082746906,
    cat_hpct: 22.85852948313516,
  },
  {
    group: 'Kate',
    cat_a: 7493,
    cat_b: 372,
    cat_c: 4830,
    cat_d: 1632,
    cat_e: 274,
    cat_f: 123,
    cat_g: 174,
    cat_h: 1537,
    cat_apct: 45.59172497718284,
    cat_bpct: 2.263462123516885,
    cat_cpct: 29.38850015211439,
    cat_dpct: 9.930027380590204,
    cat_epct: 1.6671737146334045,
    cat_fpct: 0.7484027989047763,
    cat_gpct: 1.0587161545482202,
    cat_hpct: 9.351992698509278,
  },
  {
    group: 'Alice',
    cat_a: 3513,
    cat_b: 631,
    cat_c: 145,
    cat_d: 1473,
    cat_e: 227,
    cat_f: 126,
    cat_g: 237,
    cat_h: 1573,
    cat_apct: 44.32807570977918,
    cat_bpct: 7.962145110410095,
    cat_cpct: 1.829652996845426,
    cat_dpct: 18.58675078864353,
    cat_epct: 2.864353312302839,
    cat_fpct: 1.5899053627760253,
    cat_gpct: 2.9905362776025237,
    cat_hpct: 19.84858044164038,
  },
  {
    group: 'Sally',
    cat_a: 8574,
    cat_b: 2534,
    cat_c: 537,
    cat_d: 214,
    cat_e: 254,
    cat_f: 763,
    cat_g: 143,
    cat_h: 2500,
    cat_apct: 55.24840518074618,
    cat_bpct: 16.328371673432567,
    cat_cpct: 3.460274502223081,
    cat_dpct: 1.3789548295637606,
    cat_epct: 1.6367033958373605,
    cat_fpct: 4.916553901668922,
    cat_gpct: 0.9214511244281205,
    cat_hpct: 16.109285392100006,
  },
  {
    group: 'Mary',
    cat_a: 2583,
    cat_b: 253,
    cat_c: 8459,
    cat_d: 203,
    cat_e: 126,
    cat_f: 643,
    cat_g: 2187,
    cat_h: 4832,
    cat_apct: 13.393134916519756,
    cat_bpct: 1.3118324172975215,
    cat_cpct: 43.86083169138235,
    cat_dpct: 1.0525769988592761,
    cat_epct: 0.6533236544643782,
    cat_fpct: 3.334024681115835,
    cat_gpct: 11.339832002488851,
    cat_hpct: 25.05444363787203,
  },
  {
    group: 'Jenny',
    cat_a: 2365,
    cat_b: 2305,
    cat_c: 2805,
    cat_d: 234,
    cat_e: 123,
    cat_f: 129,
    cat_g: 347,
    cat_h: 204,
    cat_apct: 27.784304511278197,
    cat_bpct: 27.07941729323308,
    cat_cpct: 32.953477443609025,
    cat_dpct: 2.7490601503759398,
    cat_epct: 1.4450187969924813,
    cat_fpct: 1.5155075187969924,
    cat_gpct: 4.076597744360902,
    cat_hpct: 2.3966165413533833,
  },
  {
    group: 'Barbara',
    cat_a: 1305,
    cat_b: 3854,
    cat_c: 2035,
    cat_d: 2034,
    cat_e: 854,
    cat_f: 743,
    cat_g: 165,
    cat_h: 123,
    cat_apct: 11.743003689372806,
    cat_bpct: 34.68010438225502,
    cat_cpct: 18.311886979213536,
    cat_dpct: 18.302888508953476,
    cat_epct: 7.684693602087646,
    cat_fpct: 6.685863403221452,
    cat_gpct: 1.4847475929092053,
    cat_hpct: 1.1068118419868622,
  },
  {
    cat_a: 90517,
    cat_b: 19369,
    cat_c: 36238,
    cat_d: 13483,
    cat_e: 5710,
    cat_f: 5416,
    cat_g: 5018,
    cat_h: 37145,
    cat_apct: 42.51700360739516,
    cat_bpct: 9.097869382233577,
    cat_cpct: 17.021456485795884,
    cat_dpct: 6.333139185329927,
    cat_epct: 2.682060724485195,
    cat_fpct: 2.5439651285134524,
    cat_gpct: 2.3570193897489853,
    cat_hpct: 17.447486096497823,
    group: 'total',
  },
];

declare let _: any;
declare let $: any;
@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css'],
})
export class StackedBarComponent implements OnInit {
  
  barHeight = 25;
  barPad = 3;
  textDy = 16;
  width = 600;

  margin = { top: 0, bottom: 0, left: 60, right: 0 };
  
  x = d3
  .scaleLinear()
  .range([0, this.width - this.margin.left])
  .domain([0, 100]);


  ngOnInit(): void {
    
    this.buildChart();
  }

  buildChart() {
    console.log(d3.schemeTableau10);
    
    let svg = d3.select('.chart').append('svg').attr('width', this.width);


    // let colorArray = [
    //   '#66c2a5',
    //   '#fc8d62',
    //   '#8da0cb',
    //   '#e78ac3',
    //   '#a6d854',
    //   '#ffd92f',
    //   '#e5c494',
    //   '#b3b3b3',
    // ];

    let colorArray = d3.schemeTableau10;

    let keys: any = [],
      legKeys: any = [];
    let data = data1;

    _.keys(data[0]).forEach( (d, i)=> {
      if (i > 0) {
        d.includes('pct') ? keys.push(d) : legKeys.push(d);
      }
    });

    data = this.addTotal(data, legKeys);

    // create the legend
    // $('.legend').css('margin-left', this.margin.left);
    // legKeys.forEach( (legKey, i) => {
    //   $('.legend').append(
    //     '<div class="swatch" style="background:' +
    //       colorArray[i] +
    //       '"></div>' +
    //       legKey
    //   );
    // });

    // sort the data, putting the total at the end
    let sorted = _.sortBy(data, keys[0]).reverse(),
      total: any[] = _.where(sorted, { group: 'total' }),
      rem = _.reject(sorted, { group: 'total' }),
      dat: any = [];
    rem.forEach((r: any) => {
      dat.push(r);
    });
    dat.push(total[0]);
    data = dat;

    // now that the data is ready, calculate the height
    let height = data.length * this.barHeight + this.barPad * 3;

    d3.select('svg').attr('height', height);

    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class',  (d) =>{
        let label;
        d.group == 'total' ? (label = 'label strong') : (label = 'label');
        return label;
      })
      .attr('x', this.margin.left - 5)
      .attr('y',  (d, i) => {
        return this.pad(d, i);
      })
      .attr('dy', this.textDy)
      .attr('text-anchor', 'end')
      .text(function (d) {
        return d.group.charAt(0).toUpperCase() + d.group.slice(1);
      });

    keys.forEach( (key, i) =>{
      svg
        .selectAll('.bar .' + key)
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar ' + key)
        .attr('width',  (d, i) => {
          return this.x(d[key]);
        })
        .attr('height', this.barHeight - this.barPad)
        .attr('x', (d: any) => {
          return this.widths(keys, key, d) as any;
        })
        .attr('y',  (d, i) => {
          return this.pad(d, i);
        });
      d3.selectAll('.' + key).style('fill', colorArray[i]);

      // svg
      //   .selectAll('.bar-label .' + key)
      //   .data(data)
      //   .enter()
      //   .append('text')
      //   .attr('class', 'bar-label ' + key)
      //   .attr('x',  (d) => {
      //     let barX: any;
      //     key !== keys[keys.length - 1]
      //       ? (barX = (this.widths(keys, key, d) as any) + 5)
      //       : (barX = this.width - 5);
      //     return barX;
      //   })
      //   .attr('dy', this.textDy)
      //   .attr('y',  (d, i) => {
      //     return this.pad(d, i);
      //   })
      //   .attr('text-anchor', (d) => {
      //     let ta;
      //     key == keys[keys.length - 1] ? (ta = 'end') : (ta = 'start');
      //     return ta;
      //   })
      //   .text( (d) => {
      //     let text;
      //     d[key] < 5
      //       ? (text = '')
      //       : (text =
      //           Math.round(d[key]) +
      //           this.pct(d, data[0].group, data[data.length - 1].group));
      //     return text;
      //   });
    });

    
  }

  pad(d, i) {
    let barI;
    d.group == 'total'
      ? (barI = i * this.barHeight + this.barPad * 2)
      : (barI = i * this.barHeight);
    return barI;
  }

  pct(d, first, last) {
    let extra;
    d.group == first || d.group == last ? (extra = '%') : (extra = '');
    return extra;
  }

  widths(keys, key, d) {
    if (key == keys[0]) {
      return this.margin.left;
    } else if (key == keys[1]) {
      return this.margin.left + this.x(d[keys[0]]);
    } else if (key == keys[2]) {
      return this.margin.left + this.x(d[keys[0]]) + this.x(d[keys[1]]);
    } else if (key == keys[3]) {
      return this.margin.left + this.x(d[keys[0]]) + this.x(d[keys[1]]) + this.x(d[keys[2]]);
    } else if (key == keys[4]) {
      return (
        this.margin.left +
        this.x(d[keys[0]]) +
        this.x(d[keys[1]]) +
        this.x(d[keys[2]]) +
        this.x(d[keys[3]])
      );
    } else if (key == keys[5]) {
      return (
        this.margin.left +
        this.x(d[keys[0]]) +
        this.x(d[keys[1]]) +
        this.x(d[keys[2]]) +
        this.x(d[keys[3]]) +
        this.x(d[keys[4]])
      );
    } else if (key == keys[6]) {
      return (
        this.margin.left +
        this.x(d[keys[0]]) +
        this.x(d[keys[1]]) +
        this.x(d[keys[2]]) +
        this.x(d[keys[3]]) +
        this.x(d[keys[4]]) +
        this.x(d[keys[5]])
      );
    } else if (key == keys[7]) {
      return (
        this.margin.left +
        this.x(d[keys[0]]) +
        this.x(d[keys[1]]) +
        this.x(d[keys[2]]) +
        this.x(d[keys[3]]) +
        this.x(d[keys[4]]) +
        this.x(d[keys[5]]) +
        this.x(d[keys[6]])
      );
    }
    return null;
  }

  addTotal(data, keys) {
    let totObj: any = {};
    let arrA: any = [];
    keys.forEach(function (key) {
      let arrB: any = [];
      data.forEach(function (d) {
        arrB.push(d[key]);
      });
      let sumB = arrB.reduce(function (a, b) {
        return a + b;
      }, 0);
      totObj[key] = sumB;
      arrA.push(sumB);
    });

    let sumA = arrA.reduce(function (a, b) {
      return a + b;
    }, 0);

    keys.forEach(function (key) {
      totObj[key + 'pct'] = (totObj[key] / sumA) * 100;
    });

    totObj.group = 'total';

    data.push(totObj);

    return data;
  }
}
