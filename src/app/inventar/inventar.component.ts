import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { InventoryService } from '../services/inventar.service';
import { ListaInventar } from './inventar';
@Component({
  selector: 'inventar',
  templateUrl: './inventar.component.html',
})
export class InventarComponent implements OnInit {
  lista: ListaInventar[];
  myForm: FormGroup;
  constructor(private inventoryService: InventoryService, fb: FormBuilder) {
    this.inventoryService.getInventory().subscribe(list => {
      this.lista = list;
    });
    this.myForm = fb.group({
      'nrCrt': ['', Validators.required],
      'titlu': ['', Validators.required],
      'descriere': ['', Validators.required],
      'unitateMasura': ['', Validators.required],
      'pretBucata': ['', Validators.required],
      'moneda': ['', Validators.required],
      'nrBucati': ['', Validators.required],
      'perioadaAmortizare': ['', Validators.required]
    });

  }

  addArticle() {
    this.inventoryService.addArticle(this.myForm.value)
      .subscribe(article => {
        this.lista.push(article);
        this.myForm.reset();
      });
  }

  updateArticle(nrCrt) {
    if (this.myForm.valid) {
      console.log("incerc sa modific articolul cu nrCrt: " + nrCrt);
      this.inventoryService.updateArticle(this.myForm.value, nrCrt)
        .subscribe(article => {
          for (var i = 0; i < this.lista.length; i++) {
            if (this.lista[i].nrCrt == article.nrCrt) {
              this.lista[i] = article;
            }
          }
        });
    } else {
      console.log("form is not valid ");
    }
  }
  deleteArticle(nrCrt) {
    this.inventoryService.deleteArticle(nrCrt)
      .subscribe(() => {
        for (var i = 0; i < this.lista.length; i++) {
          if (this.lista[i].nrCrt == nrCrt) {
            this.lista.splice(i, 1);
            console.log('incerc sa sterg elem cu nr crt ' + nrCrt);
          }
        }
      }
      );
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log("obiect: " + JSON.stringify(this.myForm.value));
      this.addArticle();
    } else {
      console.log("form is not invalid " + this.myForm.errors);
    }
  }

  ngOnInit() {
  }

}

