import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { RestService } from 'src/app/shared/rest/rest.service';

@Component({
  selector: 'app-grafica-barras',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './grafica-barras.component.html',
  styleUrl: './grafica-barras.component.css'
})
export class GraficaBarrasComponent implements OnInit {

  @Input() Title?: string = "";
  @Input() SubTitle?: string = "";
  @Input() yTitle?: string = "";
  @Input() xTitle?: string = "";
  @Input() data?: any = { catagorias:[], datos:[]};

    dataColumn:number[] = [];
    Highcharts: typeof Highcharts = Highcharts;
    updateFlag = false;
    constructor(private rest: RestService) { }
    ngOnInit(): void {
      this.cargarData();
      console.log("entra");
    }
  
    chartOptions: Highcharts.Options = {
      title: {
        text: this.Title
      },
      subtitle: {
        text: 'Fuente: Información Tabasco'
      },
      yAxis: {
        title: {
          text: 'Cantidad de Información enviada'
        }
      },
      xAxis: {
        categories: ["UNIDAD DE PROMOCIÓN A LA SALUD",
          "DIRECCION DE PROGRAMAS PREVENTIVOS",
          "SALUD REPRODUCTIVA",
          "VECTORES Y ZOONOSIS",
          "CANCER DE LA MUJER",
          "VIH/SIDA Y MICOBACTERIOSIS",
          "MEDICINA PREVENTIVA",
        ]
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: true
          },
          borderWidth: 0,
          dataLabels: {
            enabled: true,
          }
        }
      },
      series:
        [{
          name: "Departamentos",
          type: "column",
          data: this.dataColumn
        }
        ],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };
  
  
    cargarData() {
      return this.rest.get("acumulado-departamento", {}).subscribe({
        next: (response: any) => {
          let datos = [];
          let categorias = [];
          console.log("hola");
          response.data.forEach(element => {
            //this.dataLine.categorias.push(element.descripcion);
            //this.dataLine.data.push(element.cantidad);
            categorias.push(element.descripcion);
            datos.push(element.cantidad);
          });
          this.chartOptions.series[0] = { type: 'column', data: datos };
          this.chartOptions.xAxis = { categories: categorias };
          this.updateFlag = true;
  
          
        },
        error: (response: any) => {
  
        }
      });
    }

}
