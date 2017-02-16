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
      'nrCrt': [''],
      'titlu': [''],
      'descriere': [''],
      'unitateMasura': [''],
      'pretBucata': [''],
      'moneda': [''],
      'nrBucati': [''],
      'perioadaAmortizare': ['']
    });
    
  }

  addTask() {
    this.inventoryService.addArticle(this.myForm.value)
      .subscribe(task => {
        this.lista.push(task);
        this.myForm.reset();
       });
  }

  onSubmit() {
    
    console.log("obiect: " + JSON.stringify(this.myForm.value));
    this.addTask();
  }

  ngOnInit() {
  }

}

