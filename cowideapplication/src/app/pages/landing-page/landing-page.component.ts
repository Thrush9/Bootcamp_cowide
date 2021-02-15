import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexResponsive,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexXAxis,
  ApexTitleSubtitle,
  ChartComponent
} from "ng-apexcharts";
import { WorldCount } from 'src/app/modals/WorldCount';
import { UserauthService } from '../../services/userauth.service';
import { BookmarkService } from '../../services/bookmark.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegionCount } from '../../modals/RegionCount';
 
export type ChartOptionsForConfirmed = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

export type ChartOptionsForRecovered = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

export type ChartOptionsForDeaths = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};
 
export type PieChartOptionsForConfirmed = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type BarChartOptionsForConfirmed = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
}

export type PieChartOptionsForRecovered = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}

export type BarChartOptionsForRecovered = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
}

export type PieChartOptionsForDeaths = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}

export type BarChartOptionsForDeaths = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  
  //Dashboard number chart
  public ChartOptionsForConfirmed: Partial<ChartOptionsForConfirmed>;
  public ChartOptionsForRecovered: Partial<ChartOptionsForRecovered>;
  public ChartOptionsForDeaths: Partial<ChartOptionsForDeaths>;
  
  //Dashboard Pie chart
  public PieChartOptionsForConfirmed: Partial<PieChartOptionsForConfirmed>;
  public PieChartOptionsForRecovered: Partial<PieChartOptionsForRecovered>;
  public PieChartOptionsForDeaths: Partial<PieChartOptionsForDeaths>;

  //Dashboard Bar chart
  public BarChartOptionsForConfirmed: Partial<BarChartOptionsForConfirmed>;
  public BarChartOptionsForRecovered: Partial<BarChartOptionsForRecovered>;
  public BarChartOptionsForDeaths: Partial<BarChartOptionsForDeaths>;
  
  public confirmednum;
  public recoverednum;
  public deathsnum;
 
  datarecords : Object[] = [];
  continentList :any = [];
  countryList :any = [];
  // continent based 
  africaCont : any = [];
  asiaCont : any = [];
  australiaCont : any = [];
  antarcticaCont : any = [];
  europeCont : any = [];
  northAmericaCont : any = [];
  southAmericaCont : any = [];

  constructor(private dataService : DataService, private userService: UserauthService,
     private bookmarkService: BookmarkService, private snack: MatSnackBar) { 
    this.getData();
    this.loadLandingPageCounts();
  }
  
  ngOnInit(): void {
  }

  loadLandingPageCounts(){
    this.dataService.getAllCasesData().subscribe(
      (response) => {
        let data = response; 
        let global = data["Global"];
        let globalData = global["All"];
        this.confirmednum = globalData.confirmed;
        this.recoverednum = globalData.recovered;
        this.deathsnum = globalData.deaths;
        this.loadConfirmedCases();
        this.loadRecoveredCases();
        this.loadDeathCases();
      }
    )
  }

  getData() {
    this.dataService.getAllCasesData().subscribe((response) => {
     let data = response;
     // country named records
     this.datarecords  = Object.values(data);
     for (let i = 0; i < this.datarecords.length; i++) {
     // country record
      let element = this.datarecords[i];
      let contname = Object.values(element)[0].continent;
     // grouping continent records 
      if( contname == 'Africa'){
       this.africaCont.push(element);
      } else if(contname == 'Asia'){
        this.asiaCont.push(element);
      } else if(contname == 'Oceania'){
        this.australiaCont.push(element);
       } else if(contname == 'Europe'){
        this.europeCont.push(element);
       } else if(contname == 'North America'){
        this.northAmericaCont.push(element);
       } else if(contname == 'South America'){
        this.southAmericaCont.push(element);
       }
      }
      // grouping continents with counts
      this.getContinentCasesCount(this.africaCont);
      this.getContinentCasesCount(this.asiaCont);
      this.getContinentCasesCount(this.australiaCont);
      this.getContinentCasesCount(this.europeCont);
      this.getContinentCasesCount(this.northAmericaCont);
      this.getContinentCasesCount(this.southAmericaCont);
      //console.log(this.africaCont);
      this.loadConfirmedPieChart();
      this.loadConfirmedBarChart();

      this.loadRecoveredPieChart();
      this.loadRecoveredBarChart();

      this.loadDeathsPieChart();
      this.loadDeathsBarChart();
    });
  }
 
  getContinentCasesCount(continent: Object[]) {
    let totalconfirmed = 0;
      let totalrecovered = 0;
      let totaldeaths = 0;
      let count = 0;
      let contname = "";
      continent.forEach(ele => {
        const country = Object.values(ele)[0];
        // adding country to countrylist
        this.countryList.push(country);
        totalconfirmed += country.confirmed;
        totalrecovered += country.recovered;
        totaldeaths += country.deaths;
        contname = country.continent;
        count++;
      });
      var ratio = ((totaldeaths/totalconfirmed)*100).toFixed(4);
      var cont = { name:contname, confirmed : totalconfirmed ,recovered : totalrecovered,
                   deaths:totaldeaths, countries:count, deathratio: ratio}
      // adding continent to continentList
      this.continentList.push(cont);
  }

  comapreConfirmed(a,b){
    if(a.confirmed < b.confirmed){
      return 1;
    } else if(a.confirmed > b.confirmed){
      return -1;
    } else
      return 0;
  }

  comapreRecovered(a,b){
    if(a.recovered < b.recovered){
      return 1;
    } else if(a.recovered > b.recovered){
      return -1;
    } else
      return 0;
  }

  comapreDeaths(a,b){
    if(a.deaths < b.deaths){
      return 1;
    } else if(a.deaths > b.deaths){
      return -1;
    } else
      return 0;
  }

  //dashboard number
  loadConfirmedCases() {
    let num = [this.confirmednum];
    this.ChartOptionsForConfirmed = {
      series: num,
      chart: {
        height: 250,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "75%"
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "20px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      labels: ["Confirmed"]
    };
  }

  //dashboard number
  loadRecoveredCases() {
    let num = [this.recoverednum];
    this.ChartOptionsForRecovered = {
      series: num,
      chart: {
        height: 250,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "75%"
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "20px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      labels: ["Recovered"]
    };
  }

  //dashboard number
  loadDeathCases(){
    let num = [this.deathsnum];
    this.ChartOptionsForDeaths = {
      series: num,
      chart: {
        height: 250,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "75%"
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "20px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      labels: ["Death"]
    };
  }

  // Confirmed Cases Pie Chart
  loadConfirmedPieChart(){
    let label :any = [];
    let con :any  = [];
    this.continentList.forEach(ele => {
      const continent = Object.values(ele);
      label.push(continent[0]);
      con.push(continent[1]);
    })
    this.PieChartOptionsForConfirmed = {
      series: con,
      chart: {
        width: 450,
        type: "pie"
      },
    labels: label,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  }
  //confirmed cases bar chart
  loadConfirmedBarChart(){  
    let label :any = [] ;
    let con :any = [];  
    this.countryList.sort(this.comapreConfirmed);
    //console.log(this.countryList);
    for (let i = 0; i < 5; i++) {
      const ele = this.countryList[i];
      const country = Object.values(ele);
      label.push(country[3]);
      con.push(country[0]);
    }
    this.BarChartOptionsForConfirmed = {
    series: [
      {
      name: "Confirmed",
      data: con
      }
      ],
    chart: {
      type: "bar",
      height: 300
    },
    title: {
      text: "Top Five Countries"
    },
    plotOptions: {
      bar: {
      horizontal: true
    }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: label
    }
   };
  }
  //Recovered cases pie chart
  loadRecoveredPieChart() {
    let label :any = [];
    let con :any  = [];
    this.continentList.forEach(ele => {
      const continent = Object.values(ele);
      label.push(continent[0]);
      con.push(continent[2]);
    })
    this.PieChartOptionsForRecovered = {
      series: con,
      chart: {
        width: 450,
        type: "pie"
      },
    labels: label,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  }

  //Recovered cases Bar chart
  loadRecoveredBarChart() {
    let label :any = [] ;
    let con :any = [];  
    this.countryList.sort(this.comapreRecovered);
    for (let i = 0; i < 5; i++) {
      const ele = this.countryList[i];
      const country = Object.values(ele);
      label.push(country[3]);
      con.push(country[1]);

    }
    this.BarChartOptionsForRecovered = {
    series: [
      {
      name: "Recovered",
      data: con
      }
      ],
    chart: {
      type: "bar",
      height: 300
    },
    title: {
      text: "Top Five Countries"
    },
    plotOptions: {
      bar: {
      horizontal: true
    }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: label
    }
   };
  }
  //comapreDeaths
  loadDeathsPieChart() {
    let label :any = [];
    let con :any  = [];
    this.continentList.forEach(ele => {
      const continent = Object.values(ele);
      label.push(continent[0]);
      con.push(continent[3]);
    })
    this.PieChartOptionsForDeaths = {
      series: con,
      chart: {
        width: 450,
        type: "pie"
      },
    labels: label,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  }
  
  loadDeathsBarChart() {
    let label :any = [] ;
    let con :any = [];  
    this.countryList.sort(this.comapreDeaths);
    //console.log(this.countryList);
    for (let i = 0; i < 5; i++) {
      const ele = this.countryList[i];
      const country = Object.values(ele);
      label.push(country[3]);
      con.push(country[2]);
    }
    this.BarChartOptionsForDeaths = {
    series: [
      {
      name: "Confirmed",
      data: con
      }
      ],
    chart: {
      type: "bar",
      height: 300
    },
    title: {
      text: "Top Five Countries"
    },
    plotOptions: {
      bar: {
      horizontal: true
    }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: label
    }
   };
  }
  

  markWorldCounts(){
  const userId = parseInt(this.userService.getUserId());
  const con = this.confirmednum;
  const rec = this.recoverednum;
  const dea = this.deathsnum;  
  var countObj = new WorldCount(1,userId,con,rec,dea);
  this.bookmarkService.saveWorldCounts(countObj).subscribe(
    (response) => { 
      //console.log(response); 
      let msg = 'Today World Counts Marked Succesfully';
      this.snack.open(msg,'OK',{duration:5000});
    },
    (error) => { 
      //console.log(error.error); 
      let msg = error.error;
      this.snack.open(msg,'OK',{duration:5000});
    }
   );
  }

  markContinentCounts(continent){
     let userId = parseInt(this.userService.getUserId());
     let confirmed = continent.confirmed;
     let recovered = continent.recovered;
     let death = continent.deaths;
     let type = 'Continent';
     let name = continent.name;
     let belongsTo = 'World';
    var countObj = new RegionCount(1,userId,confirmed,recovered,death,type,name,belongsTo);
    this.bookmarkService.saveRegionCounts(countObj).subscribe(
      (response) => { 
        let msg = 'Today ' + name +' Counts Marked Succesfully';
        this.snack.open(msg,'OK',{duration:5000});
      },
      (error) => { 
        let msg = error.error;
        this.snack.open(msg,'OK',{duration:5000});
      }
     );
  }
  
}
