import { Component, OnInit } from '@angular/core';
import { RegionCount } from 'src/app/modals/RegionCount';
import { WorldCount } from 'src/app/modals/WorldCount';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { UserauthService } from 'src/app/services/userauth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";


interface Type {
  value: string;
  viewValue: string;
}

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type BarChartOptionsForContinent = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type BarChartOptionsForCountry = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-casehistory',
  templateUrl: './casehistory.component.html',
  styleUrls: ['./casehistory.component.scss']
})


export class CasehistoryComponent implements OnInit {

  public BarChartOptions: Partial<BarChartOptions>;
  public BarChartOptionsForContinent: Partial<BarChartOptionsForContinent>;
  public BarChartOptionsForCountry: Partial<BarChartOptionsForCountry>;

  dataList: WorldCount[];
  regionList : RegionCount[];
  continentList : any = [];
  countryList : any=[];
  find: any=[];
 
  search:string;
  searchName:string;
  datevalue:string;
  continentDate:string;
  countryDate:string;

  typeList : Type[]=[
    {value:'World', viewValue:'World'},
    {value:'Continent',viewValue:'Continent'},
    {value:'Country',viewValue:'Country'}
  ]
  //date  =  new  FormControl(new  Date());
  isValid = false;
  constructor(private userauth: UserauthService,
    private bookmarkService :BookmarkService, private snack: MatSnackBar,private datePipe: DatePipe) { }

  ngOnInit(): void {
 
    this.displayWorldData();
    this.displayRegionData();
  }

  getData()
  {
    this.isValid = true;
    this.find = [];
    let userId=this.userauth.getUserId();
    var date = this.datevalue;
   //console.log(this.datePipe.transform(date,"yyyy/MM/dd")); //output : 2018-02-13
   if(this.search=="World" && this.datevalue!=null){
    this.bookmarkService.getAllWorldCountsByIdAndDate(userId,this.datePipe.transform(date,"yyyy/MM/dd")).subscribe(
      (response)=>{
        //console.log(response);
        this.find=response;
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
   }
   if(this.datevalue!=null && this.searchName!=null){
    let userId=this.userauth.getUserId();
    var date = this.datevalue;
    this.bookmarkService.getAllRegionCountsByIdDateAndType(userId,this.datePipe.transform(date,"yyyy/MM/dd"),this.searchName).subscribe(
      (response)=>{
       //console.log(response);
         this.find=response;
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
   }
  }

  displayWorldData() {
    this.dataList = [];
    let userId=this.userauth.getUserId();
    this.bookmarkService.getAllWorldCountsByUserId(userId).subscribe(
      (response)=>{
          this.dataList=response;
          this.dataList.sort(this.sortByLatest);
          this.loadBarchartWorldCount(this.dataList);
      },
      (error) => { 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
  }

  displayRegionData() {
    this.continentList = [];
    this.countryList = [];
    this.regionList = [];
    let userId=this.userauth.getUserId();
    this.bookmarkService.getAllRegionCountsByUserId(userId).subscribe(
      (response) => {
     
       this.regionList = response;
       for (let i = 0; i < this.regionList.length; i++) {
        let element = this.regionList[i];
         if( element.type == "Continent") {
            this.continentList.push(element);
            //this.loadBarchartContinentCount(this.continentList);
          } else if(element.type == "Country") {
            this.countryList.push(element);
            //this.loadBarchartCountryCount(this.countryList);
          } 
        }
        this.continentList.sort(this.sortByLatest);
        this.countryList.sort(this.sortByLatest);
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
    
  }

  getContinentData() {
    let filteredList: any = [];
    var date = this.datePipe.transform(this.continentDate,"yyyy/MM/dd");
    for (let i = 0; i < this.continentList.length; i++) {
      let element = this.continentList[i];
       if( element.date == date) {
         filteredList.push(element);
        } 
      }  
    this.loadBarchartContinentCount(filteredList);
  }

  getCountryData() {
    let filteredList: any = [];
    var date = this.datePipe.transform(this.countryDate,"yyyy/MM/dd");
    for (let i = 0; i < this.countryList.length; i++) {
      let element = this.countryList[i];
       if( element.date == date) {
         filteredList.push(element);
        } 
      }  
      this.loadBarchartCountryCount(filteredList);
  }

  removeRegionCounts(counts : any){
   let userId = counts.userId;
   let date = counts.date;
   let name = counts.name;
    this.bookmarkService.deleteRegionCount(userId,date,name).subscribe(
      (response)=> {
        this.displayRegionData();
        let msg = 'Removed Data Successfully';
        this.snack.open(msg,'OK',{duration:5000});
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
  }

  removeWorldCounts(counts : any){
   let userId = counts.userId;
   let date = counts.date;
   let type = counts.type;
    this.bookmarkService.deleteWorldCount(userId,date,type).subscribe(
      (response)=> {
        //console.log(response);
        this.displayWorldData();
      let msg = 'Removed Data Successfully';
      this.snack.open(msg,'OK',{duration:5000});
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
  }

  sortByLatest(a,b){
    if(a.countId < b.countId){
      return 1;
    } else if(a.countId > b.countId){
      return -1;
    } else
      return 0;
  }

  loadBarchartWorldCount(list:any) {
    let confirmed: any = [] ;
    let recovered: any = [] ;
    let deaths: any = [] ;
    let dates:any = [] ;
      // adding saved data
    //list.sort(this.sortByLatest);
    let len = (list.length > 5) ? 5 : list.length;
    for (let i = 0; i < len; i++) {
      const ele = list[i];
      dates.push(ele.date);
      confirmed.push(ele.confirmed);
      recovered.push(ele.recovered);
      deaths.push(ele.death); 
    } 
    this.BarChartOptions = {
      series: [
        {
          name: "Confirmed",
          data: confirmed
        },
        {
          name: "Recovered",
          data: recovered
        },
        {
          name: "Deaths",
          data: deaths
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: dates
      },
      yaxis: {
        title: {
          text: "Cases"
        }
      },
      fill: {
        opacity: 1
      },
      title: {
        text: "Case Analysis (Based On Last Five Records)",
        align: "left"
      }  
    };
  }

  loadBarchartContinentCount(list:any) {
    let confirmed: any = [] ;
    let recovered: any = [] ;
    let deaths: any = [] ;
    let dates:any = [] ;
      // adding saved data
    //list.sort(this.sortByLatest);
    let len = (list.length > 5) ? 5 : list.length;
    for (let i = 0; i < len; i++) {
      const ele = list[i];
      dates.push(ele.date);
      confirmed.push(ele.confirmed);
      recovered.push(ele.recovered);
      deaths.push(ele.death); 
    } 
    this.BarChartOptionsForContinent = {
      series: [
        {
          name: "Confirmed",
          data: confirmed
        },
        {
          name: "Recovered",
          data: recovered
        },
        {
          name: "Deaths",
          data: deaths
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: dates
      },
      yaxis: {
        title: {
          text: "Cases"
        }
      },
      fill: {
        opacity: 1
      },
      title: {
        text: "Case Analysis (Based On Last Five Records)",
        align: "left"
      }  
    };
  }

  loadBarchartCountryCount(list:any) {
    let confirmed: any = [] ;
    let recovered: any = [] ;
    let deaths: any = [] ;
    let dates:any = [] ;
      // adding saved data
    list.sort(this.sortByLatest);
    let len = (list.length > 5) ? 5 : list.length;
    for (let i = 0; i < len; i++) {
      const ele = list[i];
      dates.push(ele.date);
      confirmed.push(ele.confirmed);
      recovered.push(ele.recovered);
      deaths.push(ele.death); 
    } 
    this.BarChartOptionsForCountry = {
      series: [
        {
          name: "Confirmed",
          data: confirmed
        },
        {
          name: "Recovered",
          data: recovered
        },
        {
          name: "Deaths",
          data: deaths
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: dates
      },
      yaxis: {
        title: {
          text: "Cases"
        }
      },
      fill: {
        opacity: 1
      },
      title: {
        text: "Case Analysis (Based On Last Five Records)",
        align: "left"
      }  
    };
  }

}
