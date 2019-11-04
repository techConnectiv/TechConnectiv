import { ModalComponent } from './modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private dialogRef: any;
  constructor(public dialog: MatDialog) {}


  ngOnInit(){
    setTimeout(() =>{
      this.openDialog();
    }, 300);
  }
  
  openDialog(): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      panelClass: 'dialog-css',
      backdropClass: 'backDrop',
      data: {}
    });
    this.dialogRef.updatePosition({ top: '55px', left: '15%' });
  }
}
