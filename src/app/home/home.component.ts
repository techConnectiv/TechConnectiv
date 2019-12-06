import { ModalComponent } from './modal/modal.component';
import { CustomerService } from './../service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

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
  }


  pageEvent(e): void {
    this.page.pula = this.page.limit * this.page.index;

    this.page.pula = e.pageIndex;

    this.refresh();
  }
  getter() {
    this.customService.paginator(this.page.pula, this.page.limit).subscribe(
      data => {

        this.page.counts = data['totalPages'];

        this.page.limit = data['size'];

        this.page.index = data['number'];

        this.dataSource = new MatTableDataSource(data['content']);
        this.dataSource.paginator = this.paginator;

        console.log(this.page.pula, this.page.limit);
      }, (err: any) => {
        this.err = err;
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
    this.customService.paginator(this.page.pula, this.page.limit).subscribe();
    this.ngOnInit();
  }

  carrocel() {
    $('#carousel123').carousel({ interval: 2000 });
  }

  /*   function() {
      $('.carousel-showmanymoveone .item').each(function () {
        var itemToClone = $(this);

        for (var i = 1; i < 4; i++) {
          itemToClone = itemToClone.next();

          // wrap around if at end of item collection
          if (!itemToClone.length) {
            itemToClone = $(this).siblings(':first');
          }

          // grab item, clone, add marker class, add to collection
          itemToClone.children(':first-child').clone()
            .addClass("cloneditem-" + (i))
            .appendTo($(this));
        }
      });
    }; */
}
