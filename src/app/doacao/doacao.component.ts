import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CustomerService } from './../service/user.service';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.component.html',
  styleUrls: ['./doacao.component.css']
})
export class DoacaoComponent implements OnInit {

  panelOpenState = false;
  listOng: any = [];
  listItem: any = [{
    tipo: "Alimento", url: "../../assets/face1.jpg"
  }, {
    tipo: "Roupa", url: "../../assets/face2.jpg"
  }, {
    tipo: "Higiene", url: "../../assets/face3.jpg"
  }, {
    tipo: "Brinquedo", url: "../../assets/face4.jpg"
  }];
  erro: any = null;

  form: FormGroup;
  loading: boolean = false;

  constructor(
    private customService: CustomerService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {

    this.jQuery();
    this.initForm();

    this.customService.getAll().subscribe(
      data => {

        this.listOng = data;

      });

    this.customService.getAll();

  }

  initForm() {
    this.form = this.fb.group({
      tipo: ["", Validators.required],
      nomeOng: ["", Validators.required],
      descricao: [null, Validators.required],
      qnt: [null, Validators.required],
      validade: ["", Validators.required],
      comentario: ""
    });
  }

  applyFilter(filterValue: string) {
    this.listOng.filter = filterValue.trim().toLowerCase();
  }

  jQuery() {
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function () {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //activate next step on progressbar using the index of next_fs
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = (now * 50) + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            'transform': 'scale(' + scale + ')',
            'position': 'absolute'
          });
          next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });

    $(".previous").click(function () {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();

      //de-activate current step on progressbar
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      //show the previous fieldset
      previous_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = ((1 - now) * 50) + "%";
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ 'left': left });
          previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });

    $(".submit").click(function () {
      return false;
    })

  }

  onSubmit(doacao: NgForm) {
    if (this.form.valid) {
      this.customService.doar(this.form.value)
        .subscribe(data => console.log(data)
        );

      this.snackbar.open('Doação efetuada com sucesso...', 'Fechar', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    } else {
      return;
    }
  }

}
