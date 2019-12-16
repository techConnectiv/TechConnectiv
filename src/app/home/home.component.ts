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

        let value = 233;
        let value2 = 203;
        let value3 = 200;
        let value4 = 189;
        const dados: any[5] = [50, 96, 163, 150, `${value}`];
        const dados2: any[5] = [80, 89, 108, 199, `${value2}`];
        const dados3: any[5] = [29, 76, 135, 139, `${value3}`];
        const dados4: any[5] = [83, 58, 99, 144, `${value4}`];

        setInterval(() => {
          for (let i = 0; i < dados.length; i++) {
            dados[dados.length - 1] = value++ + 1;
          }
          for (let i = 0; i < dados2.length; i++) {
            dados2[dados2.length - 1] = value2++ + 2;
          }
          for (let i = 0; i < dados3.length; i++) {
            dados3[dados3.length - 1] = value3++ +1;
          }
          for (let i = 0; i < dados4.length; i++) {
            dados4[dados4.length - 1] = value4++ + 4;
          }



          console.log("After", dados);


          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: ['Ago', 'Set', 'Out', 'Nov', 'Dez'],
              datasets: [{
                data: dados,
                label: "Alimentos",
                borderColor: '#1E90FF',
                fill: false
              },
              {
                data: dados2,
                label: "Roupas",
                borderColor: '#FFD700',
                fill: false
              },
              {
                data: dados3,
                label: "Higiene",
                borderColor: '#32CD32',
                fill: false
              },
              {
                data: dados4,
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
        }, 5000);
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
    this.getter();
  }

  carrocel() {
    $('#carousel123').carousel({ interval: 2000 });
  }
}
