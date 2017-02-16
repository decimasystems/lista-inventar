import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule,ValidatorFn } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InventoryService } from './services/inventar.service';
import { AppComponent } from './app.component';
import { InventarComponent } from './inventar/inventar.component';

@NgModule({
  declarations: [
    AppComponent,
    InventarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
