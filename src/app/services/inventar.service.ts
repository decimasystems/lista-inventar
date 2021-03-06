import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ListaInventar } from '../inventar/inventar';
@Injectable()
export class InventoryService {
    constructor(private http: Http) {
        console.log("InventoryService initialized.")
    }
    getInventory() {
        return this.http.get('http://localhost:3000/api/listaInventar')
            .map(res => res.json());
    }
    addArticle(article: ListaInventar) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/listaInventar', JSON.stringify(article), { headers: headers })
            .map(res => res.json());
    }

    updateArticle(article: ListaInventar, nrCrt: any) {
         var headers = new Headers();
         headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/api/listaInventar/'+nrCrt, article,{headers: headers})
             .map(res => res.json());
    }

    deleteArticle(nrCrt) {
        console.log("sending request to delete item with nrCrt: " + nrCrt);
        return this.http.delete('http://localhost:3000/api/listaInventar/'+nrCrt)
            .map(res => res.json());
    }
}