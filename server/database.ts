import { MongoClient, Collection, Server, Db } from 'mongodb';

export interface ListaInventar {
    nrCrt: number;
    titlu: string;
    descriere: string;
    unitateMasura: string;
    pretBucata: number;
    moneda: string;
    nrBucati: number;
    perioadaAmortizare: string;
}


export class DataBase {
    connectionString: string = 'mongodb://localhost:27017/local';
    public db;

    public openConnection() {
        MongoClient.connect(this.connectionString, (err, myDb) => {
            if (err) {
                console.error(err);
            } else {
                this.db = myDb;
            }
        });
    }
    public getInventar(callback: (list: ListaInventar[]) => void) {
        this.db.collection('listaInventar', (err, colectieInventar) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('do we have col' + colectieInventar);
            colectieInventar.find().toArray((err, obiecteInventar) => {
                if (err) {
                    console.error(err);
                    return;
                }

                callback(obiecteInventar);
            });
        });

    }
    public addArticle(article: ListaInventar, callback: (article: ListaInventar) => void) {
        this.db.collection('listaInventar', (err, inventar) => {
            if (err) {
                console.error(err);
                return;
            }
            inventar.insertOne(article, (err, articleObj) => {
                if (err) {
                    console.error(err);
                }
                callback(article);
            });
        });
    }


    public deleteArticle(nrCrt: string, callback: (nrCrt: string) => void) {
        this.db.collection('listaInventar', (err, inventar) => {
            if (err) {
                console.error(err);
                return;
            }
            inventar.deleteOne({ nrCrt: nrCrt }, (err, articleObj) => {
                if (err) {
                    console.error(err);
                    return;
                }
                callback(nrCrt);
            });
        });
    }
    public updateArticle( nrCrt: string, article: ListaInventar, callback: (article1: ListaInventar) =>void) {
        this.db.collection('listaInventar', (err, inventar) => {
            if (err) {
                console.error(err);
                return;
            }
            inventar.findOneAndUpdate( { nrCrt: nrCrt }, article, { returnOriginal: false }, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                callback(article);
            });
        });
    }
}






// export class DataBase {
// //     public db;
// //     connectionString = 'mongodb://localhost:27017';

// //     public openConnection() {
// //         MongoClient.connect(this.connectionString, (err, myDb) => {
// //             if (err) {
// //                 console.log('error!!');
// //             } else {
// //                 this.db = myDb;
// //             }
// //         });

// //     }
// //     public get tasks() {
// //         return this.db.collection('tasks');
// //     }
// // }

// // export var DB = new DataBase();
// // DB.openConnection();