import { Formation } from './../models/formation';
import { FormationsService } from './../services/formations.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const FormationsController = (app: Application) => {

    const router: Router = express.Router();
    const formationsService = FormationsService.getInstance();

    /**
     * Return all formations in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      formationsService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one formation in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      formationsService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new formation from a JSON body and return the created formation in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const formation: Formation = req.body; // Automatically transform in a formation object

      formationsService.create(formation).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a formation relative to its id and return the updated formation in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const formation: Formation = req.body; // req.params.id is automatically set into the body

      formationsService.update(formation).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a formation relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      formationsService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/formations', router);
};