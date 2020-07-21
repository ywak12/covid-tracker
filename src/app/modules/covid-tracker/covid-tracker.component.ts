import { Component, AfterViewInit } from '@angular/core';
import { CovidDataClient } from './service/covidDataClient.service'
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import * as Chart from 'chart.js';

@Component({
  selector: './app-covid-tracker.component.ts',
  templateUrl: './covid-tracker.component.html',
  styleUrls: ['./covid-tracker.component.scss']
})
export class CovidTrackerComponent implements AfterViewInit {

  public covidDataGender: any[];
  public covidDataAge: any[];
  public covidData: any[];
  public covidDataRegion: any[];

  public infectionCntToday: number;
  public deathCntToday: number;

  public todaysDate;
  public todaysDatePretty;

  public selectedDate;           //date picker value

  title = 'angular8chartjs';
  canvasGender: any;
  canvasAge: any;
  canvasRegion: any;

  private covidGenderChart;
  private covidAgeChart;
  private covidRegionChart;

  ctxGender: any;
  ctxAge: any;
  ctxRegion: any;

  private ageToggle: boolean = false;          //false -> infected,  true -> death
  private genderToggle: boolean = false;
  private regionToggle: boolean = false;

  private genderToggleText: string = "Infection";
  private ageToggleText: string = "Infection";
  private regionToggleText: string = "Infection";

  constructor(private covidDataClient: CovidDataClient, private datePipe: DatePipe) {
  
  }


  public toggleInfectDeathCount(graphType: string) {

    if(graphType == "gender") {
      if(this.genderToggle == false) {
        this.genderToggle = true;
        this.genderToggleText = "Death";

        this.covidGenderChart.data.datasets[0].data = [
          this.covidDataGender[0].death, this.covidDataGender[1].death
        ];
      }
      else {
        this.genderToggle = false;
        this.genderToggleText = "Infection";
        this.covidGenderChart.data.datasets[0].data = [
          this.covidDataGender[0].confCase, this.covidDataGender[1].confCase
        ];
      }
 
      this.covidGenderChart.update();
    
    }

    if(graphType == "age") {
      if(this.ageToggle == false) {
        this.ageToggle = true;
        this.ageToggleText = "Death";
        this.covidAgeChart.data.datasets[0].data = [
          this.covidDataAge[0].death, this.covidDataAge[1].death,
          this.covidDataAge[2].death, this.covidDataAge[3].death,
          this.covidDataAge[4].death, this.covidDataAge[5].death,
          this.covidDataAge[6].death, this.covidDataAge[7].death,
          this.covidDataAge[8].death
        ];
      }
      else {
        this.ageToggle = false;
        this.ageToggleText = "Infection";
        this.covidAgeChart.data.datasets[0].data =[
          this.covidDataAge[0].confCase, this.covidDataAge[1].confCase,
          this.covidDataAge[2].confCase, this.covidDataAge[3].confCase,
          this.covidDataAge[4].confCase, this.covidDataAge[5].confCase,
          this.covidDataAge[6].confCase, this.covidDataAge[7].confCase,
          this.covidDataAge[8].confCase
        ]
      }
    
      this.covidAgeChart.update();
    }


    if(graphType == "region" ) {
      if(this.regionToggle == false) {
        this.regionToggle = true;
        this.regionToggleText = "Death";
        this.covidRegionChart.data.datasets[0].data = [ 
          this.covidDataRegion[0].deathCnt, this.covidDataRegion[1].deathCnt,
          this.covidDataRegion[2].deathCnt, this.covidDataRegion[3].deathCnt,
          this.covidDataRegion[4].deathCnt, this.covidDataRegion[5].deathCnt,
          this.covidDataRegion[6].deathCnt, this.covidDataRegion[7].deathCnt,
          this.covidDataRegion[9].deathCnt, this.covidDataRegion[10].deathCnt,
          this.covidDataRegion[11].deathCnt, this.covidDataRegion[12].deathCnt,
          this.covidDataRegion[13].deathCnt, this.covidDataRegion[14].deathCnt,
          this.covidDataRegion[15].deathCnt, this.covidDataRegion[16].deathCnt,
          this.covidDataRegion[17].deathCnt, this.covidDataRegion[18].deathCnt
        ]
      }
      else {
        this.regionToggle = false;
        this.regionToggleText = "Infection";
        this.covidRegionChart.data.datasets[0].data = [ 
          this.covidDataRegion[0].defCnt, this.covidDataRegion[1].defCnt,
          this.covidDataRegion[2].defCnt, this.covidDataRegion[3].defCnt,
          this.covidDataRegion[4].defCnt, this.covidDataRegion[5].defCnt,
          this.covidDataRegion[6].defCnt, this.covidDataRegion[7].defCnt,
          this.covidDataRegion[9].defCnt, this.covidDataRegion[10].defCnt,
          this.covidDataRegion[11].defCnt, this.covidDataRegion[12].defCnt,
          this.covidDataRegion[13].defCnt, this.covidDataRegion[14].defCnt,
          this.covidDataRegion[15].defCnt, this.covidDataRegion[16].defCnt,
          this.covidDataRegion[17].defCnt, this.covidDataRegion[18].defCnt
        ]
      }
      this.covidRegionChart.update();
    }

  }

  public getCovidData(selectedDate: any) {


    this.todaysDate = selectedDate;
    this.todaysDatePretty = this.datePipe.transform(this.todaysDate, 'yyyyMMdd');

    this.covidDataClient.getCovidDataForToday(this.selectedDate.value).subscribe((data:any)=>{

      let today = data.response.body.items.item[0];
      let yesterday = data.response.body.items.item[1];

      this.deathCntToday = data.response.body.items.item[0].deathCnt - data.response.body.items.item[1].deathCnt;
      this.infectionCntToday = today.decideCnt - yesterday.decideCnt; 

    });

    this.covidDataClient.getCovidDataByGenderAndAge(this.todaysDate, this.todaysDate).subscribe((data : any)=>{
      if( this.covidDataGender != undefined && this.covidDataGender.length > 1) {
        this.covidDataGender = data.response.body.items.item.splice(9, 11);
        this.covidDataAge = data.response.body.items.item.splice(0, 9);

        this.covidGenderChart.data.datasets[0].data = [
          this.covidDataGender[0].confCase, this.covidDataGender[1].confCase
        ];

        this.covidAgeChart.data.datasets[0].data = [
          this.covidDataAge[0].confCase, this.covidDataAge[1].confCase,
          this.covidDataAge[2].confCase, this.covidDataAge[3].confCase,
          this.covidDataAge[4].confCase, this.covidDataAge[5].confCase,
          this.covidDataAge[6].confCase, this.covidDataAge[7].confCase,
          this.covidDataAge[8].confCase
        ];


        this.covidAgeChart.update();
        this.covidGenderChart.update();
      }
      else {
        this.generateCovidGraphGender(data);
        this.generateCovidGraphAge(data);
      }

    });

    this.covidDataClient.getCovidDataByRegion(this.todaysDate, this.todaysDate).subscribe((data : any)=> {
      if( this.covidDataRegion != undefined && this.covidDataRegion.length > 1) {

        this.covidDataRegion = data.response.body.items.item;

        this.covidRegionChart.data.datasets[0].data = [ 
          this.covidDataRegion[0].defCnt, this.covidDataRegion[1].defCnt,
          this.covidDataRegion[2].defCnt, this.covidDataRegion[3].defCnt,
          this.covidDataRegion[4].defCnt, this.covidDataRegion[5].defCnt,
          this.covidDataRegion[6].defCnt, this.covidDataRegion[7].defCnt,
          this.covidDataRegion[9].defCnt, this.covidDataRegion[10].defCnt,
          this.covidDataRegion[11].defCnt, this.covidDataRegion[12].defCnt,
          this.covidDataRegion[13].defCnt, this.covidDataRegion[14].defCnt,
          this.covidDataRegion[15].defCnt, this.covidDataRegion[16].defCnt,
          this.covidDataRegion[17].defCnt, this.covidDataRegion[18].defCnt
        ]

        this.covidRegionChart.update();
      }
      else {
        this.generateCovidGraphRegion(data);
      }
    })
  }


  public generateCovidGraphGender(data: any) {
      
      this.covidDataGender = data.response.body.items.item.splice(9,11);          
      // this.covidDataGender = this.latestGenderData;         //static test data

      this.canvasGender = document.getElementById('covidGenderChart');
      this.ctxGender = this.canvasGender.getContext('2d');

      this.covidGenderChart = new Chart(this.ctxGender, {
        type: 'pie',
        data: {
            labels: ["Male", "Female"],
            datasets: [{
                label: 'Covid infection by gender',
                data: [this.covidDataGender[0].confCase, this.covidDataGender[1].confCase],     //0: male, 1: female
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: false,
          display:true
        }
      });

  } 
  
  public generateCovidGraphAge(data: any) {
      this.covidDataAge = data.response.body.items.item.splice(0, 9);
      // this.covidDataAge = this.latestGenderData;    //test static data

      this.canvasAge = document.getElementById('covidAgeChart');
      this.ctxAge = this.canvasAge.getContext('2d')
  
      this.covidAgeChart = new Chart(this.ctxAge, {
        type: 'bar',
        data: {
            labels: ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"],
            datasets: [{
               label: ["Dataset by Age"],
                data: [ 
                  this.covidDataAge[0].confCase, this.covidDataAge[1].confCase,
                  this.covidDataAge[2].confCase, this.covidDataAge[3].confCase,
                  this.covidDataAge[4].confCase, this.covidDataAge[5].confCase,
                  this.covidDataAge[6].confCase, this.covidDataAge[7].confCase,
                  this.covidDataAge[8].confCase
                ],
                backgroundColor: [
                    '#FFCDD2','#EF9A9A','#E57373',
                    '#EF5350', '#F44336', '#E53935',
                    '#D32F2F', '#C62828', '#B71C1C'
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive: true,
          display:true,
          maintainAspectRatio: true
        }
      });
  }

  public generateCovidGraphRegion(data: any) {
    this.covidDataRegion = data.response.body.items.item;

    this.canvasRegion = document.getElementById('covidRegionChart');
    this.ctxRegion = this.canvasRegion.getContext('2d')

    this.covidRegionChart = new Chart(this.ctxRegion, {
      type: 'doughnut',
      data: {
          labels: ["검역", "제주", "경남", "경북", "전남", "전북", "충남", "충북", "강원", "경기", "세종", "울산", "대전", "광주", "인천", "대구", "부산", "서울"],
          datasets: [{
              label: 'Covid infection per Region',
              data: [ 
                this.covidDataRegion[0].defCnt, this.covidDataRegion[1].defCnt,
                this.covidDataRegion[2].defCnt, this.covidDataRegion[3].defCnt,
                this.covidDataRegion[4].defCnt, this.covidDataRegion[5].defCnt,
                this.covidDataRegion[6].defCnt, this.covidDataRegion[7].defCnt,
                this.covidDataRegion[9].defCnt, this.covidDataRegion[10].defCnt,
                this.covidDataRegion[11].defCnt, this.covidDataRegion[12].defCnt,
                this.covidDataRegion[13].defCnt, this.covidDataRegion[14].defCnt,
                this.covidDataRegion[15].defCnt, this.covidDataRegion[16].defCnt,
                this.covidDataRegion[17].defCnt, this.covidDataRegion[18].defCnt
              ],
              backgroundColor: [
                  '#949494', '#FF9800', '#C8E6C9',
                  '#1B5E20', '#FFCDD2', '#B71C1C',
                  '#D1C4E9', '#311B92', '#2196F3',
                  '#009688', '#FFEB3B', '#9C27B0',
                  '#FF7043', '#43A047', '#E91E63',
                  '#795548', '#827717', '#00BCD4'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
}

  ngAfterViewInit() {

    this.selectedDate = new FormControl(new Date());
    
    this.getCovidData(this.selectedDate.value);
  }  

}
