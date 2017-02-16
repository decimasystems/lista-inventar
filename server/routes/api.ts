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
export { api };


// api.get('/tasks', (req: Request, res: Response, next: NextFunction) => {
//   DB.tasks.find().toArray().then((err, tasks) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(tasks);
//   });
// });

// //get single task

// api.get('/tasks/:id', (req: Request, res: Response, next: NextFunction) => {
//   DB.tasks.findOne({ _id: new ObjectID(req.params.id) }, (err, task) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(task);
//   });
// });

// // save task

// api.post('/task', (req: Request, res: Response, next: NextFunction) => {
//   var task = req.body;
//   if (!task.title || !(task.isDone + '')) {
//     res.status(400);
//     res.json({
//       "error": "bad data"
//     });
//   } else {
//     DB.tasks.save(task, (err, task) => {
//       if (err) {
//         res.send(err);
//       }
//       res.json(task);

//     });
//   }
// });

// //delete task

// api.delete('/task/:id', (req: Request, res: Response, next: NextFunction) => {
//   DB.tasks.remove({ _id: new ObjectID(req.params.id) }, (err, task) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(task);
//   });
// });

// // update
// api.put('/task/:id', (req: Request, res: Response, next: NextFunction) => {
//   var task = req.body;
//   var updTask: any = {};
//   if (task.isDOne) {
//     updTask.isDone = task.isDone;
//   }
//   if (task.title) {
//     updTask.title = task.title;
//   }
//   if (!updTask) {
//     res.status(400);
//     res.json({
//       "error": "bad data"
//     });
//   } else {
//     DB.tasks.update({ _id: new ObjectID(req.params.id) }, updTask, {}, (err, task) => {
//       if (err) {
//         res.send(err);
//       }
//       res.json(task);
//     });

//   }

// });

// export { api };