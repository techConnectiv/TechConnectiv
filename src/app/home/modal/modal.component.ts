import { HomeComponent } from './../home.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

declare let Swiper: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.invokeSwiper();
  }

  public invokeSwiper(): void {
    Swiper('.swiper-container', {
      "pagination": '.swiper-pagination',
      "effect": 'coverflow',
      "grabCursor": true,
      "centeredSlides": true,
      "slidesPerView": 'auto',
      "coverflow": {
        "rotate": 50,
        "stretch": 0,
        "depth": 100,
        'modifier': 1,
        'slideShadows': true
      },
      "loop": true
    });
  }
}
