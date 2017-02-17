"use strict";
var express_1 = require("express");
var database_1 = require("../database");
var api = express_1.Router();
exports.api = api;
var DB = new database_1.DataBase();
DB.openConnection();
api.get("/listaInventar", function (req, res, next) {
    DB.getInventar(function (arr) {
        res.json(arr);
    });
});
api.post('/listaInventar', function (req, res, next) {
    DB.addArticle(req.body, function (article) {
        res.json(article);
    });
});
api.put('/listaInventar/:nrCrt', function (req, res, next) {
    DB.updateArticle(req.params.nrCrt, req.body, function (article) {
        res.json(article);
    });
});
api.delete('/listaInventar/:nrCrt', function (req, res, next) {
    DB.deleteArticle(req.params.nrCrt, function (nrCrt) {
        res.json(nrCrt);
    });
});
// api.delete('/listaInventar/:nrCrt', (req: Request, res: Response) => {
//     DB.listaInventar.remove ({ nrCrt: req.params.nrCrt}, (err,listaInventar) => {
//         console.log("nr crt are valoarea: "+req.params.nrCrt);
//         if(err) {
//             res.send(err);
//         } else {
//         res.json(req.body);
//         }
//     });
// });
