import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ReportServiceService } from './report-service.service';

//import { ReporteService } from 'src/app/reportes/servicios/reporte.service';
import { SharedModule } from 'src/app/shared/shared.module';

export interface DialogData {
  id?: number;
  name: string;
  color?: string;
  votos?: number;
  y?: number;
}

@Component({
  selector: 'app-line-chart',
  standalone:true,
  imports:[SharedModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit{

  @Input () Title?:string = "";
  @Input () SubTitle?:string = "";
  @Input () Categorias?:Array<string> = [];
  //@Input () Data?:Array<any> = [];
  @Input () tipoReporte?:number;
  @Input () timeDelay?:number;
  
  data:Array<any> = [];
  colors:Array<any> = [];
  chart:any; 
  isLoading: boolean;
  isLoadingPDF:boolean;

  total_casillas:number = 0;
  total_votos:number = 0;
  casillas_cerradas:number = 0;
  casilla_motivo:number = 0;

  candidatosCierre:Array<DialogData> = [];

  constructor(
    private reportServiceService:ReportServiceService,
    //private reporteService:ReporteService
  ){}

  ngOnInit(): void {
    this.cargar();  
  }

  cargar(){
    this.candidatosCierre = [];
    /*this.reporteService.getDataCierre$(null).subscribe(
      response =>
        {
          let { data } = response;
          let { casillas } = response;

          this.total_votos = 0;
          this.total_casillas = casillas.total;
          this.casillas_cerradas = casillas.cerradas;
          this.casilla_motivo = casillas.cerradas_forzadas;
          let  data_candidatos = response.candidatos;
          let total = 0;
          
          
          data_candidatos.map(element => {
            
            this.candidatosCierre.push(
              {
                id:element.id,
                name: "<span style='font-size:9pt'>"+element.partido+"</span><br><span style='font-size:10pt'>"+element.primer_candidato+"</span><br> <span style='color:red; font-size:11pt'>VOTOS "+new Intl.NumberFormat('es-MX').format(element.conteo)+"<span>",
                color: element.color_1,
                votos: parseInt(element.conteo),
                y:0
              }
            );
            this.total_votos += parseInt(element.conteo);
          });
          this.candidatosCierre.map(element =>
            {
              let numero = new Intl.NumberFormat('es-MX', { maximumSignificantDigits: 3 }).format(element.votos);
              element.y = (element.votos / this.total_votos) * 100;
            }
          );
          this.cargarData(this.candidatosCierre)
          //console.log("-->data",this.candidatosCierre);
        }
    );*/
    
  }

  cargarData(datos){
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      legend: {
        enabled: false
    },
    title: {
      text: this.Title
    },

      subtitle: {
        text: this.SubTitle,
        align: 'left'
    },

      xAxis: {
        type: 'category',
        labels: {
          autoRotation: [-45, -90],
          style: {
              fontSize: '10px',
              fontFamily: 'Verdana, sans-serif',
              textAlign:'center',
              fontWeight:'bold'
          },
          useHTML: true,
          
        }
      },
      yAxis:  {
        min:0,
        //max:100,
        title: { text: 'VOTOS (%)' }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '{point.name} <br> ( <b style="color:red">{point.y:.2f} %</b> ) '
    },
    plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: '<span style="font-size:12pt">{point.y:.1f}%</span>',
              useHTML:true
          }
      }
  },
      series:
      [
        {
          type:'column',  
          name: 'VOTOS',
          colorByPoint:true,  
          data: datos
          }
        ]
      });
  }
  
  
}
