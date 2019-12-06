import { map } from 'rxjs/operators';
import { ModalComponent } from './modal/modal.component';
import { CustomerService } from './../service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Chart } from 'chart.js';

declare var $: any;

export class UserData {
  tipo: string;
  nomeOng: string;
  descricao: string;
  quantidade: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private dialogRef: any;

  displayedColumns: string[] = ['tipo', 'nomeOng', 'descricao', 'quantidade'];
  dataSource: MatTableDataSource<UserData>;
  page: any = {};
  err: any = null;

  listItem: any = [{
    tipo: "Alimento", url: "../../assets/face1.jpg"
  }, {
    tipo: "Roupa", url: "../../assets/face2.jpg"
  }, {
    tipo: "Higiene", url: "../../assets/face3.jpg"
  }, {
    tipo: "Brinquedo", url: "../../assets/face4.jpg"
  }];

  chart = [];
  listDash: any = [];

  tipo: any = [];
  nomeOng: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private customService: CustomerService
  ) { }

  ngOnInit() {
    /*     setTimeout(() => {
          this.openDialog();
        }, 300); */
    this.getter();

    this.carrocel();

    this.listaDoacao();
  }


  pageEvent(e): void {
    this.page.pula = this.page.limit * this.page.index;

    this.page.pula = e.pageIndex;

    this.refresh();
  }

  getter() {
    this.customService.listPage(this.page.pula, this.page.limit).subscribe(
      data => {

        this.page.counts = data['totalElements'];

        this.page.limit = data['size'];

        this.page.index = data['number'];

        this.dataSource = new MatTableDataSource(data['content']);

      }, (err: any) => {
        this.err = err;
      });
  }

  listaDoacao() {
    this.customService.listaDoacao()
      .subscribe(data => {


        this.listDash = data;

        let tipo;
        let nomeOng;

        this.listDash.forEach(element => {
          tipo = element.tipo;
          nomeOng = element.nomeOng;

          this.tipo.push(tipo);
          this.nomeOng.push(nomeOng);
        });

        console.log(this.tipo, this.nomeOng);



        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: ['Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
              data: tipo,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: nomeOng,
              borderColor: '#808080',
              fill: false
            }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });


      });
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'dialog-css',
      backdropClass: 'backDrop',
      data: {}
    });
    this.dialogRef.updatePosition({ top: '55px', left: '15%' });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  refresh(): void {
    this.customService.listPage(this.page.pula, this.page.limit).subscribe();
    this.ngOnInit();
  }

  carrocel() {
    $('#carousel123').carousel({ interval: 2000 });
  }
}
