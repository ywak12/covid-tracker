import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable(  {
    providedIn: 'root'
  })
export class CovidDataClient {

  constructor(private httpClient: HttpClient,
              private datePipe: DatePipe) {
  }

  private API_KEY:string = "ljZGshOijnwcO4vHHbMhv6RW6xUhDP1s43tl3I7YNNHBm03GEq2Riv17sUaGEQOeIkKBpzOSnKKCzUdRaRoTtw%3D%3D";

  public getCovidDataForToday(date) {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

    let yesterdayDate = new Date(date);
    yesterdayDate.setDate(date.getDate() - 1);

    let yesterday = this.datePipe.transform(yesterdayDate, 'yyyyMMdd')
    let today = this.datePipe.transform(date, 'yyyyMMdd')

    let urlstring = "https://cors-anywhere.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=" + this.API_KEY+"&pageNo=1&numOfRows=10&startCreateDt=" + yesterday + "&endCreateDt=" + today;

    let response = this.httpClient.get(urlstring,
            {
              headers: myHeaders
            }
        );

    return response;
  }

  public getCovidDataByGenderAndAge(startCreateDt, endCreateDt): Observable<any> {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');


    let urlstring = "https://cors-anywhere.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19GenAgeCaseInfJson?serviceKey=" + this.API_KEY+"&pageNo=1&numOfRows=10&startCreateDt=" + this.datePipe.transform(startCreateDt, 'yyyyMMdd') + "&endCreateDt=" + this.datePipe.transform(startCreateDt, 'yyyyMMdd');

    let response = this.httpClient.get(urlstring,
            {
              headers: myHeaders
            }
        );

    return response;
  }

  public getCovidDataByRegion(startCreateDt, endCreateDt) :Observable<any> {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');

    let urlstring = "https://cors-anywhere.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=" + this.API_KEY+"&pageNo=1&numOfRows=10&startCreateDt=" + this.datePipe.transform(startCreateDt, 'yyyyMMdd') + "&endCreateDt=" + this.datePipe.transform(startCreateDt, 'yyyyMMdd');

    let response = this.httpClient.get(urlstring,
            {
              headers: myHeaders
            }
        );

    return response;

  }


}
