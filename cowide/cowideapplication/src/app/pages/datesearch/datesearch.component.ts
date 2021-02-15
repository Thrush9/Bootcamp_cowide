import { Component, OnInit } from '@angular/core';
import { RegionCount } from 'src/app/modals/RegionCount';
import { WorldCount } from 'src/app/modals/WorldCount';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { UserauthService } from 'src/app/services/userauth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { DataService } from '../../services/data.service';
import { DatePipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

export type ChartOptionsForCountry = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

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

interface Continent {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-datesearch',
  templateUrl: './datesearch.component.html',
  styleUrls: ['./datesearch.component.scss']
})
export class DatesearchComponent implements OnInit {

  public chartOptions: Partial<ChartOptions>;
  public BarChartOptions: Partial<BarChartOptions>;
  public ChartOptionsForCountry: Partial<ChartOptionsForCountry>;

  search: string;
  searchcountry: string;
  worldList : any = [];
  regionList : any = [];
  continentList : any = [];
  countryList : any=[];

  africaCounts: any = [];
  asiaCounts: any = [];
  oceaniaCounts:any = []; 
  europeCounts:any = [];
  nortAmericaCounts: any = [];
  southAmericaCounts: any = [];

  continents: Continent[] = [
    {value: 'Africa', viewValue: 'Africa'},
    {value: 'Asia', viewValue: 'Asia'},
    {value: 'Oceania', viewValue: 'Oceania'},
    {value: 'Europe', viewValue: 'Europe'},
    {value: 'North America', viewValue: 'North America'},
    {value: 'South America', viewValue: 'South America'}
  ];

  todayWorldconfirmed;
  todayWorldrecovered;
  todayWorlddeaths;
  todayContinentCounts;
  todayCountryCounts;

  constructor(private userauth: UserauthService,private bookmarkService :BookmarkService, 
    private snack: MatSnackBar, private dataService : DataService,private datePipe: DatePipe) { 

    }

  ngOnInit(): void {
    this.loadTodayWorldCounts();
    // this.getWorldData();
    // this.getRegionData();
  }
  
  //fetch today counts
  loadTodayWorldCounts(){
    this.dataService.getAllCasesData().subscribe(
      (response) => {
        let data = response; 
        let global = data["Global"];
        let todayWorldCounts = global["All"];
        this.todayWorldconfirmed = todayWorldCounts.confirmed;
        this.todayWorldrecovered = todayWorldCounts.recovered;
        this.todayWorlddeaths = todayWorldCounts.deaths;
        this.getWorldData();
        this.getRegionData();
      }
    );
  }

  //fetch saved world counts
  getWorldData() {
    this.worldList = [];
    let userId = this.userauth.getUserId();
    this.bookmarkService.getAllWorldCountsByUserId(userId).subscribe(
      (response) => {
        //console.log(result);
        this.worldList=response;
        this.loadBarchartWorldCount();
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
  }
  
  // fetch saved continent-country counts
  getRegionData() {
    this.continentList = [];
    this.countryList = [];
    this.regionList = [];
      
    let userId = this.userauth.getUserId();
    this.bookmarkService.getAllRegionCountsByUserId(userId).subscribe(
      (response) => {
        //console.log(result);
        this.regionList = response;
        for (let i = 0; i < this.regionList.length; i++) {
        let element = this.regionList[i];
          if( element.type == "Continent") {
              this.continentList.push(element);
            } else if(element.type == "Country") {
              this.countryList.push(element);
            } 
          }
          this.loadContinentRecords();
      },
      (error) => { 
        //console.log(error.error); 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
    );
  }

  // splitting continent records
  loadContinentRecords() { 
    this.continentList.forEach(element => {
      if(element.name == 'Africa'){
        this.africaCounts.push(element);
      } else if (element.name == 'Asia'){
        this.asiaCounts.push(element);
      } else if (element.name == 'Oceania'){
        this.oceaniaCounts.push(element);
      } else if (element.name == 'Europe'){
        this.europeCounts.push(element);
      } else if (element.name == 'North America'){
        this.nortAmericaCounts.push(element);
      } else if (element.name == 'South America'){
        this.southAmericaCounts.push(element);
      } 
    });
  }

  // call based on search continent 
  loadContinentData(){
    let datarecords:Object[]=[];
    let searchCont:Object[] = [] ;
    let totalconfirmed = 0;
    let totalrecovered = 0;
    let totaldeaths = 0;
    this.dataService.getAllCasesDataByContinent(this.search).subscribe((response) => {
      let data = response;
      // data records
      datarecords  = Object.values(data);
      for (let i = 0; i < datarecords.length; i++) {
       // country record
       let element = datarecords[i];
       let contname = Object.values(element)[0].continent;
       // grouping continent records 
       if( contname == this.search){
          searchCont.push(element);
        } 
       }
      searchCont.forEach(ele => {
        const country = Object.values(ele)[0];
        // adding country to countrylist
        totalconfirmed += country.confirmed;
        totalrecovered += country.recovered;
        totaldeaths += country.deaths;
      });
      this.todayContinentCounts = { confirmed : totalconfirmed ,recovered : totalrecovered, deaths:totaldeaths}
        
      if(this.search == 'Africa'){
        this.loadLineChartContinentCounts(this.africaCounts);
      } else if (this.search == 'Asia'){
        this.loadLineChartContinentCounts(this.asiaCounts);
      } else if (this.search == 'Oceania'){
        this.loadLineChartContinentCounts(this.oceaniaCounts);
      } else if (this.search == 'Europe'){
        this.loadLineChartContinentCounts(this.europeCounts);
      } else if (this.search == 'North America'){
        this.loadLineChartContinentCounts(this.nortAmericaCounts);
      } else if (this.search == 'South America'){
        this.loadLineChartContinentCounts(this.southAmericaCounts);
      }
    }); 
  }

  // call based on country data
  loadCountryData(){
    let countryRecords: any = [];
    this.dataService.getAllCasesDataByCountry(this.searchcountry).subscribe((response) => {
      let data = response;
      this.todayCountryCounts = data['All'];
      this.countryList.forEach(element => {
        if(element.name == this.searchcountry){
           countryRecords.push(element);
        }
      });
      this.loadLineChartCountryCounts(countryRecords);
    });
  }
    
  sortByLatest(a,b){
    if(a.countId < b.countId){
      return 1;
    } else if(a.countId > b.countId){
      return -1;
    } else
      return 0;
  }

  //wolrd counts
  loadBarchartWorldCount() {
    let confirmed: any = [] ;
    let recovered: any = [] ;
    let deaths: any = [] ;
    let dates:any = [] ;
      // adding today data
    let today = new Date();
    let date = this.datePipe.transform(today,"yyyy/MM/dd");
      dates.push(date);
      confirmed.push(this.todayWorldconfirmed);
      recovered.push(this.todayWorldrecovered);
      deaths.push(this.todayWorlddeaths);
      // adding saved data
    this.worldList.sort(this.sortByLatest);
    let len = (this.worldList.length > 5) ? 5 : this.worldList.length;
    for (let i = 0; i < len; i++) {
      const ele = this.worldList[i];
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

  // line chart for continents
  loadLineChartContinentCounts(list:any){
    let confirmed: any = [] ;
    let recovered: any = [] ;
    let deaths: any = [] ;
    let dates:any = [] ;
     // adding today data
     let today = new Date();
     let date = this.datePipe.transform(today,"yyyy/MM/dd");
       dates.push(date);
       confirmed.push(this.todayContinentCounts.confirmed);
       recovered.push(this.todayContinentCounts.recovered);
       deaths.push(this.todayContinentCounts.deaths);
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
    this.chartOptions = {
      series: [
        {
          name: "Confirmed",
          data: confirmed
        },
        {
          name: "Recovered",
          data: recovered
        }
        ,
        {
          name: "Deaths",
          data: deaths
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Case Analysis (Based On Last Five Records)",
        align: "left"
      },
      xaxis: {
        type: "datetime",
        categories:dates
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
   } 


   // line chart for continents
  loadLineChartCountryCounts(list:any){
    let confirmed: any = [] ;
    let recovered: any = [] ;
    let deaths: any = [] ;
    let dates:any = [] ;
     // adding today data
     let today = new Date();
     let date = this.datePipe.transform(today,"yyyy/MM/dd");
       dates.push(date);
       confirmed.push(this.todayCountryCounts.confirmed);
       recovered.push(this.todayCountryCounts.recovered);
       deaths.push(this.todayCountryCounts.deaths);
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
    this.ChartOptionsForCountry = {
      series: [
        {
          name: "Confirmed",
          data: confirmed
        },
        {
          name: "Recovered",
          data: recovered
        }
        ,
        {
          name: "Deaths",
          data: deaths
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Case Analysis (Based On Last Five Records)",
        align: "left"
      },
      xaxis: {
        type: "datetime",
        categories:dates
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
   }

 }
  
