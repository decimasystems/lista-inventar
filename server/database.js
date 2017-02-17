"use strict";
var mongodb_1 = require("mongodb");
var DataBase = (function () {
    function DataBase() {
        this.connectionString = 'mongodb://localhost:27017/local';
    }
    DataBase.prototype.openConnection = function () {
        var _this = this;
        mongodb_1.MongoClient.connect(this.connectionString, function (err, myDb) {
            if (err) {
                console.error(err);
            }
            else {
                _this.db = myDb;
            }
        });
    };
    DataBase.prototype.getInventar = function (callback) {
        this.db.collection('listaInventar', function (err, colectieInventar) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('do we have col' + colectieInventar);
            colectieInventar.find().toArray(function (err, obiecteInventar) {
                if (err) {
                    console.error(err);
                    return;
                }
                callback(obiecteInventar);
            });
        });
    };
    DataBase.prototype.addArticle = function (article, callback) {
        this.db.collection('listaInventar', function (err, inventar) {
            if (err) {
                console.error(err);
                return;
            }
            inventar.insertOne(article, function (err, articleObj) {
                if (err) {
                    console.error(err);
                }
                callback(article);
            });
        });
    };
    DataBase.prototype.deleteArticle = function (nrCrt, callback) {
        this.db.collection('listaInventar', function (err, inventar) {
            if (err) {
                console.error(err);
                return;
            }
            inventar.deleteOne({ nrCrt: nrCrt }, function (err, articleObj) {
                if (err) {
                    console.error(err);
                    return;
                }
                callback(nrCrt);
            });
        });
    };
    DataBase.prototype.updateArticle = function (nrCrt, article, callback) {
        this.db.collection('listaInventar', function (err, inventar) {
            if (err) {
                console.error(err);
                return;
            }
            inventar.findOneAndUpdate({ nrCrt: nrCrt }, article, function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }
                callback(article);
            });
        });
    };
    return DataBase;
}());
exports.DataBase = DataBase;
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
