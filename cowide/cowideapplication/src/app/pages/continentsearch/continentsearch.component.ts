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
  ApexLegend,
  ChartComponent
} from "ng-apexcharts";
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserauthService } from '../../services/userauth.service';
import { BookmarkService } from '../../services/bookmark.service';
import { RegionCount } from '../../modals/RegionCount';

interface Continent {
  value: string;
  viewValue: string;
}

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

export type TreeChartOptionsForConfirmed = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

export type BarChartOptionsForConfirmed = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type PieChartOptionsForRecovered = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type TreeChartOptionsForRecovered = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
  };

export type BarChartOptionsForRecovered = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type PieChartOptionsForDeaths = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type TreeChartOptionsForDeaths = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
  };

export type BarChartOptionsForDeaths = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-continentsearch',
  templateUrl: './continentsearch.component.html',
  styleUrls: ['./continentsearch.component.scss']
})
export class ContinentsearchComponent implements OnInit {
  
  m:any;
   //Dashboard number chart
  public ChartOptionsForConfirmed: Partial<ChartOptionsForConfirmed>;
  public ChartOptionsForRecovered: Partial<ChartOptionsForRecovered>;
  public ChartOptionsForDeaths: Partial<ChartOptionsForDeaths>;

  //Dashboard Pie chart
  public PieChartOptionsForConfirmed: Partial<PieChartOptionsForConfirmed>;
  public PieChartOptionsForRecovered: Partial<PieChartOptionsForRecovered>;
  public PieChartOptionsForDeaths: Partial<PieChartOptionsForDeaths>;

  //Dashboard Tree chart
  public TreeChartOptionsForConfirmed: Partial<TreeChartOptionsForConfirmed>;
  public TreeChartOptionsForRecovered: Partial<TreeChartOptionsForRecovered>;
  public TreeChartOptionsForDeaths: Partial<TreeChartOptionsForDeaths>;

  //Dashboard Bar chart
  public BarChartOptionsForConfirmed: Partial<BarChartOptionsForConfirmed>;
  public BarChartOptionsForRecovered: Partial<BarChartOptionsForRecovered>;
  public BarChartOptionsForDeaths: Partial<BarChartOptionsForDeaths>;


  public confirmednum;
  public recoverednum;
  public deathsnum;
  public isValid = false;
  
  datarecords : Object[] = [];
  continentList :any = [];
  countryList :any = [];
  // continent based 
  searchCont : any = [];
  search: string;

  continents: Continent[] = [
    {value: 'Africa', viewValue: 'Africa'},
    {value: 'Asia', viewValue: 'Asia'},
    {value: 'Oceania', viewValue: 'Oceania'},
    {value: 'Europe', viewValue: 'Europe'},
    {value: 'North America', viewValue: 'North America'},
    {value: 'South America', viewValue: 'South America'}
  ];
  
  constructor(private dataService : DataService, private userService: UserauthService,
    private bookmarkService: BookmarkService, private snack: MatSnackBar) { 

  }

  ngOnInit(): void {
  }

  getData() {
  this.isValid = true;
  this.datarecords = [];
  this.continentList = [];
  this.countryList = []; 
  this.searchCont = [];

    this.dataService.getAllCasesDataByContinent(this.search).subscribe((response) => {
     let data = response;
     // data records
     this.datarecords  = Object.values(data);
     for (let i = 0; i < this.datarecords.length; i++) {
      // country record
      let element = this.datarecords[i];
      let contname = Object.values(element)[0].continent;
      // grouping continent records 
      if( contname == this.search){
       this.searchCont.push(element);
       } 
      }
      // grouping continents with counts
      this.getContinentCasesCount(this.searchCont);

      this.loadConfirmedCases();   
      this.loadRecoveredCases();
      this.loadDeathCases();
      
      //this.loadConfirmedPieChart();
      this.loadConfirmedBarChart();
      this.loadTreemapForConfirmed();

      //this.loadRecoveredPieChart();
      this.loadRecoveredBarChart();
      this.loadTreemapForRecovered();

      //this.loadDeathsPieChart();
      this.loadDeathsBarChart();
      this.loadTreemapForDeaths();

      let msg = 'Loaded Data Successfully';
      this.snack.open(msg,'OK',{duration:5000});
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
      this.confirmednum = this.continentList[0].confirmed;
      this.recoverednum = this.continentList[0].recovered;
      this.deathsnum = this.continentList[0].deaths;
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
    this.countryList.forEach(ele => {
      const country = Object.values(ele);
      label.push(country[3]);
      con.push(country[0]);
    });
    this.PieChartOptionsForConfirmed = {
      series: con,
      chart: {
        width: 600,
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

//confirmed Treemap
loadTreemapForConfirmed (){
  let list :any = [];
  this.countryList.forEach(ele => {
    const country = Object.values(ele);
    let data = {x:country[3],y:country[0]};
    list.push(data);
  });

  this.TreeChartOptionsForConfirmed = {
    series: [
      {
        data: list
    }
  ],
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: "treemap"
  },
  title: {
    text: "Distibuted Scenario",
    align: "center"
  },
  colors: [
    "#3B93A5",
    "#F7B844",
    "#ADD8C7",
        "#EC3C65",
        "#CDD7B6",
        "#C1F666",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#7F94B0",
        "#EF6537",
        "#C0ADDB"
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    };
}

  //confirmed cases bar chart
  loadConfirmedBarChart(){  
    let label :any = [] ;
    let con :any = [];  
    this.countryList.sort(this.comapreConfirmed);
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
      height: 350
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
   this.countryList.forEach(ele => {
      const continent = Object.values(ele);
      label.push(continent[3]);
      con.push(continent[1]);
    });
    this.PieChartOptionsForRecovered = {
      series: con,
      chart: {
        width: 600,
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

  //confirmed Treemap
  loadTreemapForRecovered (){
  let list :any = [];
  this.countryList.forEach(ele => {
    const country = Object.values(ele);
    let data = {x:country[3],y:country[1]};
    list.push(data);
  });

  this.TreeChartOptionsForRecovered = {
    series: [
      {
        data: list
    }
  ],
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: "treemap"
  },
  title: {
    text: "Distibuted Scenario",
    align: "center"
  },
  colors: [
    "#3B93A5",
    "#F7B844",
    "#ADD8C7",
        "#EC3C65",
        "#CDD7B6",
        "#C1F666",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#7F94B0",
        "#EF6537",
        "#C0ADDB"
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
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
      height: 350
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

    //Death cases Pie chart
    loadDeathsPieChart() {
      let label :any = [];
      let con :any  = [];
      this.countryList.forEach(ele => {
        const country = Object.values(ele);
        label.push(country[3]);
        con.push(country[2]);
      })
      this.PieChartOptionsForDeaths = {
        series: con,
        chart: {
          width: 600,
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
  
//confirmed Treemap
loadTreemapForDeaths (){
  let list :any = [];
  this.countryList.forEach(ele => {
    const country = Object.values(ele);
    let data = {x:country[3],y:country[2]};
    list.push(data);
  });
  this.TreeChartOptionsForDeaths = {
    series: [
      {
        data: list
    }
  ],
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: "treemap"
  },
  title: {
    text: "Distibuted Scenario",
    align: "center"
  },
  colors: [
    "#3B93A5",
    "#F7B844",
    "#ADD8C7",
        "#EC3C65",
        "#CDD7B6",
        "#C1F666",
        "#D43F97",
        "#1E5D8C",
        "#421243",
        "#7F94B0",
        "#EF6537",
        "#C0ADDB"
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    };
}

  //Death cases Bar chart
  loadDeathsBarChart() {
    let label :any = [] ;
    let con :any = [];  
    this.countryList.sort(this.comapreDeaths);
    
    for (let i = 0; i < 5; i++) {
      const ele = this.countryList[i];
      const country = Object.values(ele);
      label.push(country[3]);
      con.push(country[2]);
    }
    this.BarChartOptionsForDeaths = {
    series: [
      {
      name: "Death",
      data: con
      }
      ],
    chart: {
      type: "bar",
      height: 350
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

  markContinetCounts(){
    let userId = parseInt(this.userService.getUserId());
    let confirmed = this.confirmednum;
    let recovered = this.recoverednum;
    let death = this.deathsnum;
    let type = 'Continent';
    let name = this.search;
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
  
  markCountryCounts(country){
    let userId = parseInt(this.userService.getUserId());
    let confirmed = country.confirmed;
    let recovered = country.recovered;
    let death = country.deaths;
    let type = 'Country';
    let name = country.country;
    let belongsTo = this.search;
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
