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

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: ['Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
              data: ["50", "96", "163", "150", "258"],
              label: "Alimentos",
              borderColor: '#1E90FF',
              fill: false
            },
            {
              data: ["38", "72", "50", "263", "182"],
              label: "Roupas",
              borderColor: '#FFD700',
              fill: false
            },
            {
              data: ["80", "353", "240", "268", "304"],
              label: "Higiene",
              borderColor: '#32CD32',
              fill: false
            },
            {
              data: ["180", "126", "170", "230", "214"],
              label: "Brinquedos",
              borderColor: '#D2691E',
              fill: false
            }
            ]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true
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
