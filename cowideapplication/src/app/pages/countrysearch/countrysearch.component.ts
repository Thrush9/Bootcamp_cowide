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
  selector: 'app-countrysearch',
  templateUrl: './countrysearch.component.html',
  styleUrls: ['./countrysearch.component.scss']
})
export class CountrysearchComponent implements OnInit {
  m:any;
  // Dashboard Number chart
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
  public isStateValid = false;

  datakeys: Object[] = [];
  datavalues:  Object[] = [];
  
  // country based 
  searchCountry : any = [];
  stateList :any = [];
  search: string;

  constructor(private dataService : DataService,  private userService: UserauthService,
    private bookmarkService: BookmarkService, private snack: MatSnackBar) { 
    
  }

  ngOnInit(): void {
  }

  getData() {
  this.isValid = true;
  this.datakeys = [];
  this.datavalues = [];
  this.searchCountry = [];
  this.stateList = [];
  
    this.dataService.getAllCasesDataByCountry(this.search).subscribe((response) => {
     let data = response;
     this.searchCountry = data['All'];
     // country named records
     this.datakeys  = Object.keys(data);
     this.datavalues  = Object.values(data);
     for (let i = 1; i < this.datavalues.length; i++) {
      var state = {name:this.datakeys[i],details:this.datavalues[i]}
      //console.log(state);
      this.stateList.push(state); 
     }
     this.confirmednum = this.searchCountry.confirmed;
     console.log(this.searchCountry);
     this.recoverednum = this.searchCountry.recovered;
     this.deathsnum = this.searchCountry.deaths;
     this.loadConfirmedCases();   
     this.loadRecoveredCases();
     this.loadDeathCases();
    
      if(this.stateList.length > 0 ) {
        this.isStateValid = true
      //this.loadConfirmedPieChart();
      this.loadConfirmedBarChart();
      this.loadTreemapForConfirmed();

      //this.loadRecoveredPieChart();
      this.loadRecoveredBarChart();
      this.loadTreemapForRecovered();

      //this.loadDeathsPieChart();
      this.loadDeathsBarChart();
      this.loadTreemapForDeaths();
      } else {
        this.isStateValid = false
      }
     let msg = 'Loaded Data Successfully';
     this.snack.open(msg,'OK',{duration:5000});
    });
  }

  comapreConfirmed(a,b){
    if(a.details.confirmed < b.details.confirmed){
      return 1;
    } else if(a.details.confirmed > b.details.confirmed){
      return -1;
    } else
      return 0;
  }

  comapreRecovered(a,b){
    if(a.details.recovered < b.details.recovered){
      return 1;
    } else if(a.details.recovered > b.details.recovered){
      return -1;
    } else
      return 0;
  }

  comapreDeaths(a,b){
    if(a.details.deaths < b.details.deaths){
      return 1;
    } else if(a.details.deaths > b.details.deaths){
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
  this.stateList.forEach(ele => {
    label.push(ele.name);
    con.push(ele.details.confirmed);
  })
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
  this.stateList.forEach(ele => {
    let data = {x:ele.name,y:ele.details.confirmed}
    list.push(data);
  })
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
  this.stateList.sort(this.comapreConfirmed);
  for (let i = 0; i < 5; i++) {
    const ele = this.stateList[i];
    label.push(ele.name);
    con.push(ele.details.confirmed);
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
    text: "Top Five States"
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
 this.stateList.forEach(ele => {
    label.push(ele.name);
    con.push(ele.details.recovered);
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
  this.stateList.forEach(ele => {
    let data = {x:ele.name,y:ele.details.recovered}
    list.push(data);
  })
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

  //recovered cases bar chart
loadRecoveredBarChart(){  
  let label :any = [] ;
  let con :any = [];  
  this.stateList.sort(this.comapreRecovered);
  for (let i = 0; i < 5; i++) {
    const ele = this.stateList[i];
    label.push(ele.name);
    con.push(ele.details.recovered);
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
    text: "Top Five States"
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

//death cases pie chart
loadDeathsPieChart() {
  let label :any = [];
  let con :any  = [];
 this.stateList.forEach(ele => {
    label.push(ele.name);
    con.push(ele.details.deaths);
  });
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

  //deaths treemap
  loadTreemapForDeaths(){
    let list :any = [];
  this.stateList.forEach(ele => {
    let data = {x:ele.name,y:ele.details.deaths}
    list.push(data);
  })
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

  //deaths cases bar chart
loadDeathsBarChart(){  
  let label :any = [] ;
  let con :any = [];  
  this.stateList.sort(this.comapreDeaths);
  for (let i = 0; i < 5; i++) {
    const ele = this.stateList[i];
    label.push(ele.name);
    con.push(ele.details.deaths);
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
    text: "Top Five States"
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

markCountryCounts(){
  let userId = parseInt(this.userService.getUserId());
  let confirmed = this.confirmednum;
  let recovered = this.recoverednum;
  let death = this.deathsnum;
  let type = 'Country';
  let name = this.search;
  let belongsTo = this.searchCountry.continent;
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