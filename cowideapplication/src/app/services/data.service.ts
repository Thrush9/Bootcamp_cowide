import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataurl : string = "https://covid-api.mmediagroup.fr/v1/cases";

  constructor(private httpclient : HttpClient) { }
 
  getAllCasesData() 
  {
    return  this.httpclient.get(this.dataurl); 
  }

  getAllCasesDataByContinent(search: string) 
  {
    return  this.httpclient.get(`https://covid-api.mmediagroup.fr/v1/cases?continent=${search}`);
  }

  getAllCasesDataByCountry(search: string)
  {
    return  this.httpclient.get(`https://covid-api.mmediagroup.fr/v1/cases?country=${search}`);
  }

}
