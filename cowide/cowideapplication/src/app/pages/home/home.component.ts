import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RoutingserviceService } from '../../services/routingservice.service';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart
} from "ng-apexcharts";

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public ChartOptionsForConfirmed: Partial<ChartOptionsForConfirmed>;
  public ChartOptionsForRecovered: Partial<ChartOptionsForRecovered>;
  public ChartOptionsForDeaths: Partial<ChartOptionsForDeaths>;
  public today = new Date();

  public confirmed;
  public recovered;
  public deaths;

  constructor(private dataService : DataService, private routeobj : RoutingserviceService) {
    this.loadHomePageCounts();
   }

  ngOnInit(): void {
  }

  showLogin(){
    this.routeobj.openLogin();
  }

  loadHomePageCounts(){
    this.dataService.getAllCasesData().subscribe(
      (response) => {
        let data = response; 
        let global = data["Global"];
        let globalData = global["All"];
        this.confirmed = globalData.confirmed;
        this.recovered = globalData.recovered;
        this.deaths = globalData.deaths;
        this.loadConfirmedCases();
        this.loadRecoveredCases();
        this.loadDeathCases();
      }
    )
  }

  loadConfirmedCases() {
    let num = [this.confirmed];
    this.ChartOptionsForConfirmed = {
      series: num,
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%"
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      labels: ["Confirmed Cases"]
    };
  }

  loadRecoveredCases() {
    let num = [this.recovered];
    this.ChartOptionsForRecovered = {
      series: num,
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%"
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      labels: ["Recovered Cases"]
    };
  }

  loadDeathCases(){
    let num = [this.deaths];
    this.ChartOptionsForDeaths = {
      series: num,
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%"
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      labels: ["Death Cases"]
    };
  }

}
