import { Router, Request, Response, NextFunction } from 'express';
import { MongoClient, Collection, ObjectID } from 'mongoDB';
import { DataBase, ListaInventar } from '../database';

var api: Router = Router();

var DB = new DataBase();
DB.openConnection();


api.get("/listaInventar", (req: Request, res: Response, next: NextFunction) => {
    DB.getInventar((arr: ListaInventar[]) => {
        res.json(arr);
    });
});

api.post('/listaInventar', (req: Request, res: Response, next: NextFunction) => {
    DB.addArticle(req.body, (article: ListaInventar) => {
        res.json(article);
    });
});

api.put('/listaInventar/:nrCrt', (req: Request, res: Response, next: NextFunction) => {
    DB.updateArticle(req.params.nrCrt, req.body, (article: ListaInventar) => {
        res.json(article);
    });
});


api.delete('/listaInventar/:nrCrt', (req: Request, res: Response, next: NextFunction) => {
    DB.deleteArticle(req.params.nrCrt, (nrCrt) => {
        res.json(nrCrt);
    });
});




export { api };


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

